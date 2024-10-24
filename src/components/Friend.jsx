import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../styles/Friend.css";
import apiClient from "./apiClient"; // API 클라이언트
import FriendList from "./FriendList"; // 친구 목록 컴포넌트
import ReceivedRequests from "./ReceivedRequest"; // 받은 요청 컴포넌트
import { useNavigate } from "react-router-dom"; // 리다이렉트용

const Friend = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [error, setError] = useState(""); // 오류 메시지 상태
  const navigate = useNavigate(); // 리다이렉트용 훅

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm(""); // 검색어 초기화
    setSearchResults([]); // 검색 결과 초기화
    setError(""); // 오류 메시지 초기화
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 업데이트
  };

  // 친구 검색 GET API 호출 함수
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
      console.log(response.data); // API 응답 로그
      setSearchResults(response.data.data); // 검색 결과 설정
    } catch (error) {
      setError(error.response?.data?.message || "친구 검색에 실패했습니다."); // 오류 메시지 설정
    }
  };

  // 친구 추가 함수
  const handleAddFriend = async (nickName) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
      }

      // 친구 추가 API 호출
      const response = await apiClient.post(
        "/friends",
        { nickName: nickName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // 추가된 친구 정보 로그

      if (response.data.isSuccess) {
        // 친구 추가 요청이 성공하면 버튼 상태를 'WAITING'으로 업데이트
        setSearchResults((prevResults) =>
          prevResults.map((friend) =>
            friend.nickName === nickName
              ? { ...friend, status: "WAITING" } // 상태를 WAITING으로 업데이트
              : friend
          )
        );
        setError(""); // 에러 초기화
      } else {
        setError(response.data.message || "친구 추가 요청에 실패했습니다.");
      }
    } catch (error) {
      // API에서 받은 에러 응답 처리
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

  // 탭 변경 시 401 에러 처리
  const handleTabContent = () => {
    if (currentTab === 0) {
      return <FriendList />;
    } else if (currentTab === 1) {
      return (
        <ReceivedRequests
          onError={(error) => {
            if (error.response?.status === 401) {
              // 401 에러 발생 시 로그인 페이지로 리다이렉트
              navigate("/login");
            }
          }}
        />
      );
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
          <Tab value={1} label="받은 기록" />
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
                }} // 엔터 키 이벤트 핸들러
              />
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* 오류 메시지 */}
            {/* 검색 결과 표시 */}
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
                        disabled={friend.status !== "NOTHING"} // 상태에 따라 버튼 비활성화
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
      {handleTabContent()}
    </div>
  );
};

export default Friend;
