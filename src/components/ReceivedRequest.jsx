import React, { useEffect, useState } from "react";
import apiClient from "./apiClient"; // API 클라이언트
import "../styles/ReceivedRequest.css"; // 스타일 시트 임포트
import { ReactComponent as NoFriendAsked } from "../img/NoFriendAsked.svg";
import DefaultProfile from "../img/DefaultProfile.svg"; // 기본 프로필 이미지 경로

const ReceivedRequests = ({ onError, onAccept }) => {
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

  const handleReject = async (friendId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      const response = await apiClient.delete(`/friends/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.isSuccess) {
        alert("친구 요청이 거절되었습니다.");
        setFriendRequests(
          friendRequests.filter((req) => req.friendId !== friendId)
        );
      } else {
        alert(response.data.message || "친구 요청 거절에 실패했습니다.");
      }
    } catch (error) {
      setError("친구 요청 거절에 실패했습니다.");
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (friendRequests.length === 0) {
    return (
      <div className="ReceivedRequestsWrapper">
        <div className="no-friend-asked-container">
          <NoFriendAsked />
        </div>
      </div>
    );
  }

  return (
    <div
      className="ReceivedRequestsWrapper"
      style={{
        justifyContent: friendRequests.length === 0 ? "center" : "flex-start",
        alignItems: friendRequests.length === 0 ? "center" : "flex-start",
      }}
    >
      {friendRequests.length === 0 ? (
        <div className="no-friend-asked-container">
          <NoFriendAsked />
        </div>
      ) : (
        <ul className="friend-requests-list">
          {friendRequests.map((request) => (
            <li key={request.friendId} className="friend-request-item">
              <div className="friend-info">
                <img
                  src={request.profileUrl || DefaultProfile} // 프로필 이미지가 없으면 기본 이미지 사용
                  alt={request.nickName}
                  className="profile-image"
                />
                <span className="friend-nickname">{request.nickName}</span>
              </div>
              <div className="action-buttons">
                <button
                  className="accept-button"
                  onClick={() => onAccept(request.friendId)}
                >
                  수락
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(request.friendId)}
                >
                  거절
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReceivedRequests;
