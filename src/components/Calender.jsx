import React, { useState } from "react";
import "../styles/Calender.css";
import { ReactComponent as Thumbnail } from "../img/Thumbnail.svg";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);

  // Calculate the number of days in the current month and the starting day
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

  const posts = {
    2: { img: "src/img/Thumbnail.svg" },
    3: { img: "src/img/Thumbnail.svg" },
    4: { img: "src/img/Thumbnail.svg" },
    7: { img: "src/img/Thumbnail.svg" },
    10: { img: "src/img/Thumbnail.svg" },
  };

  const handleDayClick = (day) => {
    if (posts[day]) {
      setSelectedImage(posts[day].img);
    }
  };

  const handleMonthChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setCurrentDate(new Date(year, month - 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <select
          className="custom-select"
          value={`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }).map((_, idx) => {
            const date = new Date(currentDate.getFullYear(), idx, 1);
            return (
              <option key={idx} value={`${date.getFullYear()}-${idx + 1}`}>
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
        {/* Days of the week */}
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx} className="day-of-week">
            {day}
          </div>
        ))}
        {/* Render empty cells for days before the 1st */}
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx} className="calendar-day empty"></div>
        ))}
        {/* Render the days of the month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          return (
            <div
              key={day}
              className={`calendar-day ${posts[day] ? "has-post" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="day-number">{day}</div>
              {posts[day] && (
                <Thumbnail
                  className="thumbnail-image"
                  alt={`Post on day ${day}`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Image viewer for selected posts */}
      {selectedImage && (
        <div className="image-viewer">
          <img src={selectedImage} alt="Selected Post" />
        </div>
      )}
    </div>
  );
};

export default Calendar;
