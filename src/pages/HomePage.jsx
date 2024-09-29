import React, { useState } from "react";
import Header from "../components/Header";
import Attendance from "../components/Attendance";
import "../styles/HomePage.css";
import RecordHomeContents from "../components/RecordHomeContents";
import Friend from "../components/Friend";

const HomePage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabSelect = (tabIndex) => {
    setCurrentTab(tabIndex); // 선택된 탭의 인덱스를 상태로 설정
  };

  return (
    <>
      <Header onSelectTab={handleTabSelect} currentTab={currentTab} />
      <div className="HomeWrapper">
        {currentTab === 0 && <RecordHomeContents />}
        {currentTab === 1 && <Attendance />}
        {currentTab === 2 && <Friend />}
      </div>
    </>
  );
};

export default HomePage;
