import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FeedBundle from "./FeedBundle";
import "../styles/RecordHomeContents.css";
import Calender from "./Calender";
import { Switch } from "@mui/material"; // MUI에서 Switch 임포트

const HomeContents = ({ nickname }) => {
  const [currentTab, setCurrentTab] = useState(0); // 초기값 설정

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue); // 탭 변경 핸들러
  };

  return (
    <div className="ContentsWrapper">
      <div className="h1">{nickname}님의 기록들 모아보기</div>{" "}
      {/* 닉네임 표시 */}
      <Tabs
        value={currentTab} // 현재 선택된 탭의 인덱스
        onChange={handleTabChange} // 탭 변경 핸들러
        sx={{
          "& .MuiTab-root": {
            color: "#a9abbb", // 기본 탭 색상
            fontSize: "18px",
            fontWeight: "400",
            marginLeft: "10px",
          },
          "& .Mui-selected": {
            color: "#000000 !important", // 선택된 탭 색상
            fontWeight: "700",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#000000", // 인디케이터 색상
          },
          marginBottom: "40px",
          marginTop: "20px",
        }}
      >
        <Tab value={0} label="캘린더" />
        <Tab value={1} label="피드" />
      </Tabs>
      <div className="OnlyMine">
        <div className="h3">내피드만 보기</div>
        <Switch defaultChecked color="warning" />
      </div>
      <div
        className="calender"
        style={{ display: currentTab === 0 ? "" : "none" }}
      >
        <Calender />
      </div>
      <div className="Feed" style={{ display: currentTab === 1 ? "" : "none" }}>
        <FeedBundle />
        <FeedBundle />
        <FeedBundle />
        <FeedBundle />
        <FeedBundle />
        <FeedBundle />
      </div>
    </div>
  );
};

export default HomeContents;
