import React, { useEffect, useState } from "react";
import apiClient from "./apiClient"; // API 클라이언트

const ReceivedRequests = ({ onError }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("토큰이 없습니다. 다시 로그인 해주세요.");
          return;
        }

        const response = await apiClient.get("/friends/asks?page=0", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.isSuccess) {
          setFriendRequests(response.data.data); // 친구 요청 목록 설정
          setError(null); // 오류 초기화
        } else {
          setError(
            response.data.message || "친구 요청 목록을 가져오는데 실패했습니다."
          );
        }
      } catch (err) {
        if (err.response?.status === 401) {
          onError(err); // 401 에러 발생 시 부모 컴포넌트로 전파
        } else {
          setError(
            err.response?.data?.message ||
              "친구 요청 목록을 불러오는데 실패했습니다."
          );
        }
      }
    };

    fetchFriendRequests();
  }, [onError]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (friendRequests.length === 0) {
    return <p>받은 친구 요청이 없습니다.</p>;
  }

  return (
    <ul className="friend-requests-list">
      {friendRequests.map((request) => (
        <li key={request.friendId} className="friend-request-item">
          <div className="friend-info">
            <img
              src={request.profileUrl}
              alt={request.nickName}
              className="profile-image"
            />
            <span className="friend-nickname">{request.nickName}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReceivedRequests;
