// src/api.js
import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "https://ttoon.site/api",
});

// 재발급 요청 상태를 추적하기 위한 변수
let isRefreshing = false;
let failedQueue = [];

// 요청 대기열 처리 함수
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        console.log("재발급 요청을 시작합니다. RefreshToken:", refreshToken);

        const response = await axios.post(
          "https://ttoon.site/api/auth/reissue",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              refreshToken: refreshToken, // refreshToken 헤더로 전달
            },
          }
        );

        console.log("재발급 응답:", response.data); // 재발급 응답을 로그로 출력

        if (response.data.isSuccess) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.data;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          console.log("새로운 accessToken:", newAccessToken); // 새로운 accessToken 로그
          console.log("새로운 refreshToken:", newRefreshToken); // 새로운 refreshToken 로그

          apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          console.error("토큰 재발급 실패:", response.data.message);
          throw new Error("Reissue failed");
        }
      } catch (refreshError) {
        console.error("재발급 요청 중 오류 발생:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("로그인 상태가 만료되었습니다. 다시 로그인해주세요.");
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error("API 요청 중 오류 발생:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
