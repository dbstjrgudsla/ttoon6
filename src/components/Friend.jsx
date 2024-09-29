import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../styles/Friend.css";
import { ReactComponent as NoFriend } from "../img/NoFriend.svg";
import { FaSearch } from "react-icons/fa";
import { ReactComponent as NoFriendAsked } from "../img/NoFriendAsked.svg";

const Friend = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 업데이트
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
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>닉네임으로 친구를 찾아보세요</h2>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="searchInput"
                placeholder="친구의 닉네임을 검색해보세요"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className="FriendList"
        style={{ display: currentTab === 0 ? "" : "none" }}
      >
        <div className="FriendListWrapper">
          <NoFriend />
        </div>
      </div>
      <div
        className="AskFriend"
        style={{ display: currentTab === 1 ? "" : "none" }}
      >
        <div className="FriendListWrapper">
          <NoFriendAsked />
        </div>
      </div>
    </div>
  );
};

export default Friend;
