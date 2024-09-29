import React, { useState } from "react";
import "../styles/Calender.css";

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);

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
    2: { img: "https://via.placeholder.com/100" },
    3: { img: "https://via.placeholder.com/100" },
    4: { img: "https://via.placeholder.com/100" },
    7: { img: "https://via.placeholder.com/100" },
    10: { img: "https://via.placeholder.com/100" },
  };

  const handleDayClick = (day) => {
    if (posts[day]) {
      setSelectedImage(posts[day].img);
    }
  };

  const handleMonthChange = (increment) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + increment))
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>이전 달</button>
        <h3>
          {currentDate.getFullYear()}년{" "}
          {currentDate.toLocaleString("ko-KR", { month: "long" })}
        </h3>
        <button onClick={() => handleMonthChange(1)}>다음 달</button>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx} className="calendar-day empty"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          return (
            <div
              key={day}
              className={`calendar-day ${posts[day] ? "has-post" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <div>{day}</div>
              {posts[day] && (
                <img src={posts[day].img} alt={`Post on day ${day}`} />
              )}
            </div>
          );
        })}
      </div>
      {selectedImage && (
        <div className="image-viewer">
          <img src={selectedImage} alt="Selected Post" />
        </div>
      )}
    </div>
  );
};

export default Calender;
