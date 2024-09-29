import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  // 기본 Content-Type 설정 제거
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
    console.log("Request Config:", config); // 추가된 로그
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response:", response); // 응답 로그 추가
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("401 Unauthorized Error - Attempting to refresh token");

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log("New token received from queue:", token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            console.log("Retrying original request with new token");
            return apiClient(originalRequest);
          })
          .catch((err) => {
            console.error("Error in token refresh queue:", err);
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        console.log(
          "Requesting token refresh with refreshToken:",
          refreshToken
        );
        const response = await axios.post(
          "https://ttoon.site/api/auth/reissue",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              refreshToken: refreshToken,
            },
          }
        );

        console.log("Reissue Response:", response.data);

        if (response.data.isSuccess) {
          const { accessToken, refreshToken } = response.data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          console.log("Retrying original request with new access token");
          return apiClient(originalRequest);
        } else {
          throw new Error("Reissue failed");
        }
      } catch (refreshError) {
        console.error("Refresh Token Error:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
