import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../styles/Friend.css";
import apiClient from "./apiClient";
import FriendList from "./FriendList";
import ReceivedRequests from "./ReceivedRequest";
import { useNavigate } from "react-router-dom";

const Friend = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [friendList, setFriendList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFriendList = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      const response = await apiClient.get("/friends?page=0", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.isSuccess) {
        setFriendList(response.data.data || []);
        setError("");
      } else {
        setError(
          response.data.message || "친구 목록을 불러오는데 실패했습니다."
        );
      }
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      setLoading(true);
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
        setRequestList(response.data.data || []);
        setError("");
      } else {
        setError(
          response.data.message || "받은 친구 요청을 불러오는데 실패했습니다."
        );
      }
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (err) => {
    if (err.response?.status === 401) {
      setError("인증이 만료되었습니다. 다시 로그인해주세요.");
      navigate("/login");
    } else {
      setError("요청을 처리하는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (currentTab === 0) {
      fetchFriendList();
    } else if (currentTab === 1) {
      fetchReceivedRequests();
    }
  }, [currentTab]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAcceptRequest = async (requestId, nickName) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      // 친구 요청 수락 API 호출
      const patchResponse = await apiClient.patch(
        `/friends/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (patchResponse.data.isSuccess) {
        // 친구 요청을 수락했다는 알림
        alert("친구 요청을 수락했습니다.");

        // 수락된 친구 요청을 `requestList`에서 제거하고 `friendList`에 추가
        setRequestList((prevRequests) =>
          prevRequests.filter((req) => req.friendId !== requestId)
        );
        setFriendList((prevFriends) => [
          ...prevFriends,
          { friendId: requestId, nickName },
        ]);

        setError("");

        // 탭을 친구 목록으로 자동 전환
        setCurrentTab(0);
      } else {
        setError(
          patchResponse.data.message || "친구 요청 수락에 실패했습니다."
        );
      }
    } catch (error) {
      setError("친구 요청 수락에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      const response = await apiClient.delete(`/friends/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setRequestList((prevRequests) =>
          prevRequests.filter((req) => req.friendId !== requestId)
        );
        setError("");
        alert("친구 요청을 거절했습니다.");
      } else {
        setError(response.data.message || "친구 요청 거절에 실패했습니다.");
      }
    } catch (error) {
      setError("친구 요청 거절에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      setLoading(true);
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
        setFriendList((prevFriends) =>
          prevFriends.filter((friend) => friend.friendId !== friendId)
        );
        alert("친구가 삭제되었습니다.");
        setError("");
      } else {
        setError(response.data.message || "친구 삭제에 실패했습니다.");
      }
    } catch (error) {
      setError("친구 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    setError("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFriend = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      const response = await apiClient.get(
        `/friends/search?name=${searchTerm}&page=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSearchResults(response.data.data || []);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "친구 검색에 실패했습니다.");
    }
  };

  const handleAddFriend = async (nickName) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      const response = await apiClient.post(
        "/friends",
        { nickName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        setSearchResults((prevResults) =>
          prevResults.map((friend) =>
            friend.nickName === nickName
              ? { ...friend, status: "WAITING" }
              : friend
          )
        );
        setError("");
        alert("친구 추가 요청이 성공적으로 전송되었습니다.");
      } else {
        setError(response.data.message || "친구 추가 요청에 실패했습니다.");
      }
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response.data.code === "COMMON400_5"
      ) {
        setError("이미 친구이거나 둘 중 한명이 친구 요청을 보낸 상태입니다.");
      } else {
        setError("친구 추가 요청에 실패했습니다.");
      }
    }
  };

  return (
    <div className="ContentsWrapper">
      <div className="h1">친구 관리</div>
      <div className="TabsAndButtonWrapper">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              color: "#a9abbb",
              fontSize: "18px",
              fontWeight: "400",
              marginLeft: "10px",
            },
            "& .Mui-selected": {
              color: "#000000 !important",
              fontWeight: "700",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#000000",
            },
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          <Tab value={0} label="친구 목록" />
          <Tab value={1} label="받은 요청" />
        </Tabs>
        <button className="AddFriend" onClick={openModal}>
          친구 추가하기
        </button>
      </div>

      {isModalOpen && (
        <div className="modalOverlay" onClick={closeModal}>
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
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchFriend();
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
                        onClick={() => handleAddFriend(friend.nickName)}
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

      {currentTab === 0 && (
        <FriendList friends={friendList} onDeleteSuccess={handleDeleteFriend} />
      )}
      {currentTab === 1 && (
        <ReceivedRequests
          requests={requestList}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      )}

      {error && <p className="error-message">{error}</p>}
      {loading && <p>로딩 중...</p>}
    </div>
  );
};

export default Friend;
