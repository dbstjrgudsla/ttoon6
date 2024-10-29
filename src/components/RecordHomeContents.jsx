import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../styles/RecordHomeContents.css";
import Calender from "./Calender";
import { Switch } from "@mui/material";
import apiClient from "./apiClient";
import DefaultProfile from "../img/DefaultProfile.svg"; // 기본 프로필 이미지 경로

const RecordHomeContents = ({ nickname }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [onlyMine, setOnlyMine] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await apiClient.get("/feeds", {
          params: {
            page: 0,
            size: 10,
            onlyMine: onlyMine,
          },
        });

        if (response.data.isSuccess) {
          setFeeds(response.data.data);
        } else {
          setError("피드를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setError("인증이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
        } else {
          setError("피드를 가져오는 중 오류가 발생했습니다.");
        }
      }
    };

    fetchFeeds();
  }, [onlyMine]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSwitchChange = (event) => {
    setOnlyMine(event.target.checked);
  };

  return (
    <div className="ContentsWrapper">
      <div className="h1">{nickname}님의 기록들 모아보기</div>
      <div className="TabsWrapper">
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
          <Tab value={0} label="캘린더" />
          <Tab value={1} label="피드" />
        </Tabs>
        <div className="OnlyMine">
          <div className="h3">내피드만 보기</div>
          <Switch
            checked={onlyMine}
            onChange={handleSwitchChange}
            color="warning"
          />
        </div>
      </div>
      <div
        className="calender"
        style={{ display: currentTab === 0 ? "" : "none" }}
      >
        <Calender />
      </div>
      <div className="Feed" style={{ display: currentTab === 1 ? "" : "none" }}>
        {error && <p className="error-message">{error}</p>}
        {feeds && feeds.length > 0 ? (
          <div className="FeedWrapper">
            {feeds.map((feed) => (
              <div key={feed.feedId} className="FeedBundleWrapper">
                <div className="FeedHeader">
                  <img
                    src={feed.writerImage || DefaultProfile} // 프로필 이미지가 없으면 기본 이미지 사용
                    alt="프로필"
                    className="WriterImage"
                  />
                  <span className="WriterName">{feed.writerName}</span>
                  <span className="MoreOptions">•••</span>
                </div>
                <div className="FeedImage">
                  {feed.imageUrl.length > 0 ? (
                    <img
                      src={feed.imageUrl[0]}
                      alt="피드 이미지"
                      className="FeedImageContent"
                    />
                  ) : (
                    <div style={{ color: "black", fontSize: "20px" }}>
                      이미지 없음
                    </div>
                  )}
                </div>
                <div className="FeedTitle">{feed.title}</div>
                <div className="FeedContent">{feed.content}</div>
                <div className="FeedDate">{feed.createdDate}</div>
                <div className="FeedLikes">
                  <span role="img" aria-label="likes">
                    ❤️
                  </span>{" "}
                  {feed.likes}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>표시할 피드가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecordHomeContents;
