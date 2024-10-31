import React, { useState, useEffect } from "react";
import "../styles/Calender.css";
import apiClient from "./apiClient";
import SingleFeedModal from "./SingleFeedModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const yearMonth = `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}`;
        const response = await apiClient.get(
          `/home/calendar?yearMonth=${yearMonth}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.data.isSuccess) {
          setThumbnails(response.data.data);
        } else {
          setError("썸네일 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("썸네일 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchThumbnails();
  }, [currentDate]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleDayClick = async (day) => {
    const selectedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    try {
      const response = await apiClient.get(`/home?date=${selectedDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.isSuccess) {
        setSelectedFeed(response.data.data); // API에서 받아온 피드를 모달로 설정
      } else {
        setError("피드 데이터를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("피드 데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleMonthChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const closeModal = () => {
    setSelectedFeed(null); // 모달 닫기
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <select
          className="custom-select"
          value={`${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}`}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }).map((_, idx) => {
            const date = new Date(currentDate.getFullYear(), idx, 1);
            return (
              <option
                key={idx}
                value={`${date.getFullYear()}-${String(idx + 1).padStart(
                  2,
                  "0"
                )}`}
              >
                {date.toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                })}
              </option>
            );
          })}
        </select>
      </div>

      <div className="calendar-grid">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx} className="day-of-week">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx} className="calendar-day empty"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const thumbnailData = thumbnails.find(
            (thumbnail) =>
              thumbnail.createdDate ===
              `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          );

          return (
            <div
              key={day}
              className={`calendar-day ${thumbnailData ? "has-post" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="day-number">{day}</div>
              {thumbnailData && (
                <img
                  src={thumbnailData.thumbnail}
                  alt={`Post on ${thumbnailData.createdDate}`}
                  className="thumbnail-image"
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedFeed && (
        <SingleFeedModal feed={selectedFeed} onClose={closeModal} />
      )}
      <div className="fff"></div>
    </div>
  );
};

export default Calendar;
