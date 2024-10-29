import React, { useState } from "react";
import "../styles/Friend.css";

const AddFriendModal = ({
  isModalOpen,
  onClose,
  onSearchFriend,
  onAddFriend,
  searchTerm,
  onSearchTermChange,
  searchResults,
  error,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
    onSearchTermChange(e.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <div className="modalOverlay" onClick={onClose}>
          <div
            className="FriendmodalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>닉네임으로 친구를 찾아보세요</h2>
            <div className="search-container">
              <input
                type="text"
                className="searchInput"
                placeholder="친구의 닉네임을 검색해보세요"
                value={localSearchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearchFriend();
                }}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {searchResults.length > 0 ? (
              <ul className="friend-search-results">
                {searchResults.map((friend) => (
                  <li key={friend.friendId} className="friend-list-item">
                    <div className="friend-info">
                      <img
                        src={friend.profileUrl}
                        alt="프로필"
                        className="profile-image"
                      />
                      <span className="friend-nickname">{friend.nickName}</span>
                    </div>
                    <div className="friend-action">
                      <button
                        className={`AddFriendBtn ${
                          friend.status === "ACCEPT"
                            ? "friend-accepted"
                            : friend.status === "WAITING"
                            ? "friend-waiting"
                            : friend.status === "ASKING"
                            ? "friend-asking"
                            : "friend-request"
                        }`}
                        onClick={() => onAddFriend(friend.nickName)}
                        disabled={friend.status !== "NOTHING"}
                      >
                        {friend.status === "ACCEPT"
                          ? "현재 친구"
                          : friend.status === "WAITING"
                          ? "요청됨"
                          : friend.status === "ASKING"
                          ? "받은 요청"
                          : "친구 신청"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddFriendModal;
