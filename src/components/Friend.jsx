import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../styles/Friend.css";
import axios from "axios"; // Axios 임포트
import FriendList from "./FriendList"; // 친구 목록 컴포넌트
import ReceivedRequests from "./ReceivedRequest"; // 받은 요청 컴포넌트

const Friend = ({ accessToken }) => {
  // accessToken을 prop으로 받습니다.
  const [currentTab, setCurrentTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [error, setError] = useState(""); // 오류 메시지 상태

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm(""); // 모달을 닫을 때 검색어 초기화
    setError(""); // 오류 메시지 초기화
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 업데이트
  };

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        "https://ttoon.site/api/friends",
        { nickName: searchTerm }, // 요청 본문
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data); // 성공적으로 추가된 친구의 정보
      closeModal(); // 모달 닫기
    } catch (error) {
      setError(
        error.response?.data?.message || "친구 추가 요청에 실패했습니다."
      ); // 오류 메시지 설정
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
              />
              <button onClick={handleAddFriend}>친구 추가</button>{" "}
              {/* 친구 추가 버튼 */}
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* 오류 메시지 표시 */}
          </div>
        </div>
      )}
      {currentTab === 0 && <FriendList />} {/* 친구 목록 */}
      {currentTab === 1 && <ReceivedRequests />} {/* 받은 요청 */}
    </div>
  );
};

export default Friend;
