import React, { useState } from "react";
import apiClient from "./apiClient";
import "../styles/FriendList.css";
import { ReactComponent as TrashIcon } from "../img/Trash.svg";
import { ReactComponent as NoFriend } from "../img/NoFriend.svg";
import DefaultProfile from "../img/DefaultProfile.svg"; // 기본 프로필 이미지 경로

const FriendList = ({ friends, onDeleteSuccess }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const openDeleteModal = (friend) => {
    setSelectedFriend(friend);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedFriend(null);
    setShowDeleteModal(false);
  };

  const handleDeleteFriend = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      const response = await apiClient.delete(
        `/friends/${selectedFriend.friendId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        alert("친구가 삭제되었습니다.");
        onDeleteSuccess(selectedFriend.friendId);
        closeDeleteModal();
      } else {
        alert(response.data.message || "친구 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("친구 삭제에 실패했습니다.");
    }
  };

  return (
    <div
      className="FriendListWrapper"
      style={{
        justifyContent: friends.length === 0 ? "center" : "flex-start",
      }}
    >
      {friends.length === 0 ? (
        <NoFriend />
      ) : (
        friends.map((friend) => (
          <div key={friend.friendId} className="friend-item">
            <img
              src={friend.profileUrl || DefaultProfile} // 프로필 이미지가 없으면 기본 이미지 사용
              alt={`${friend.nickName}의 프로필`}
              className="friend-profile"
            />
            <span className="friend-nickname">{friend.nickName}</span>
            <button
              className="delete-friend-button"
              onClick={() => openDeleteModal(friend)}
            >
              친구 삭제
            </button>
          </div>
        ))
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <button className="close-button" onClick={closeDeleteModal}>
              ×
            </button>
            <div className="h2">
              ‘{selectedFriend.nickName}’님과 <br />
              친구를 끊으시겠어요?
            </div>
            <div className="h3" style={{ fontSize: "16px" }}>
              친구를 삭제하면, 이제 친구의 <br />
              기록을 볼 수 없게 되어요
            </div>
            <div className="trash-icon">
              <TrashIcon />
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={closeDeleteModal}>
                돌아가기
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDeleteFriend}
              >
                삭제할래요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendList;
