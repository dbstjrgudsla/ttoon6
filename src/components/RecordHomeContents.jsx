import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../styles/RecordHomeContents.css";
import Calender from "./Calender";
import { Switch } from "@mui/material";
import apiClient from "./apiClient";
import SingleFeedModal from "./SingleFeedModal";
import DefaultProfile from "../img/DefaultProfile.svg";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // 모달 컴포넌트 가져오기

const RecordHomeContents = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [onlyMine, setOnlyMine] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [nickname, setNickname] = useState("");
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [calendarData, setCalendarData] = useState([]);
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedToDelete, setFeedToDelete] = useState(null);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await apiClient.get("/profile");
        if (response.data.isSuccess) {
          setNickname(response.data.data.nickName);
        } else {
          setError("프로필 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("프로필 정보를 가져오는 중 오류가 발생했습니다.");
      }
    };
    fetchNickname();
  }, []);

  useEffect(() => {
    fetchFeeds();
    fetchCalendarData();
  }, [onlyMine]);

  const fetchFeeds = async () => {
    try {
      const response = await apiClient.get("/feeds", {
        params: { page: 0, size: 10, onlyMine: onlyMine },
      });

      if (response.data.isSuccess) {
        setFeeds(response.data.data);

        const initialLikes = {};
        const initialUserLikes = {};

        response.data.data.forEach((feed) => {
          initialLikes[feed.feedId] = feed.likes;
          initialUserLikes[feed.feedId] = feed.likeOrNot || false;
        });

        setLikeCounts(initialLikes);
        setUserLikes(initialUserLikes);
      } else {
        setError("피드를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("피드를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const fetchCalendarData = async () => {
    const yearMonth = `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}`;
    try {
      const response = await apiClient.get(
        `/home/calendar?yearMonth=${yearMonth}`
      );
      if (response.data.isSuccess) {
        setCalendarData(response.data.data);
      } else {
        setError("캘린더 데이터를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("캘린더 데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleLikeToggle = async (feedId) => {
    const isLiked = userLikes[feedId];
    try {
      if (isLiked) {
        const response = await apiClient.delete(`/likes/${feedId}`);
        if (response.data.isSuccess) {
          setLikeCounts((prev) => ({
            ...prev,
            [feedId]: prev[feedId] - 1,
          }));
          setUserLikes((prev) => ({
            ...prev,
            [feedId]: false,
          }));
        }
      } else {
        const response = await apiClient.post(`/likes/${feedId}`);
        if (response.data.isSuccess) {
          setLikeCounts((prev) => ({
            ...prev,
            [feedId]: prev[feedId] + 1,
          }));
          setUserLikes((prev) => ({
            ...prev,
            [feedId]: true,
          }));
        }
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  const openDeleteModal = (feedId, feedDate) => {
    setFeedToDelete({ id: feedId, date: feedDate });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setFeedToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!feedToDelete) return;
    try {
      const response = await apiClient.delete(`/delete/${feedToDelete.id}`);
      if (response.data.isSuccess) {
        closeDeleteModal();
        window.location.reload(); // 삭제 후 페이지 새로고침
      } else {
        alert("피드 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("피드 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSwitchChange = (event) => {
    setOnlyMine(event.target.checked);
  };

  const handleFeedClick = (feed) => {
    setSelectedFeed(feed);
  };

  const closeModal = () => {
    setSelectedFeed(null);
  };

  const toggleOptions = (feedId) => {
    setShowOptions((prevId) => (prevId === feedId ? null : feedId));
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
        <Calender data={calendarData} />
      </div>
      <div className="Feed" style={{ display: currentTab === 1 ? "" : "none" }}>
        {error && <p className="error-message">{error}</p>}
        {feeds && feeds.length > 0 ? (
          <div className="FeedWrapper">
            {feeds.map((feed) => (
              <div
                key={feed.feedId}
                className="FeedBundleWrapper"
                onClick={() => handleFeedClick(feed)}
              >
                <div className="FeedHeader">
                  <img
                    src={feed.writerImage || DefaultProfile}
                    alt="프로필"
                    className="WriterImage"
                  />
                  <span className="WriterName">{feed.writerName}</span>
                  <span
                    className="MoreOptions"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOptions(feed.feedId);
                    }}
                  >
                    •••
                  </span>
                  {showOptions === feed.feedId && (
                    <div className="optionsMenu">
                      <a
                        href={feed.imageUrl[0]}
                        download={`feed_${feed.feedId}.jpg`}
                        className="downloadButton"
                      >
                        이미지 다운로드
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(feed.feedId, feed.createdDate);
                        }}
                        className="deleteButton"
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
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
                <div className="FeedContent">
                  {feed.content.length > 100
                    ? `${feed.content.substring(0, 100)}...`
                    : feed.content}
                </div>
                <div className="FeedDate">{feed.createdDate}</div>
                <div className="FeedLikes">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeToggle(feed.feedId);
                    }}
                    className="likeButton"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      marginTop: "5px",
                    }}
                  >
                    {userLikes[feed.feedId] ? (
                      <IoMdHeart style={{ color: "red" }} />
                    ) : (
                      <IoMdHeartEmpty style={{ color: "black" }} />
                    )}
                  </button>
                  <span style={{ color: "black", fontSize: "16px" }}>
                    {likeCounts[feed.feedId]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>표시할 피드가 없습니다.</p>
        )}
      </div>
      {selectedFeed && (
        <SingleFeedModal feed={selectedFeed} onClose={closeModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          date={feedToDelete?.date}
        />
      )}
    </div>
  );
};

export default RecordHomeContents;
