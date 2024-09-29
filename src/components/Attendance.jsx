import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Attendance.css"; // 스타일 파일 추가

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("https://ttoon.site/api/attendance", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { attendanceDtoList, point } = response.data.data;
      setAttendanceData(attendanceDtoList);
      setPoints(point);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleAttendanceCheck = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://ttoon.site/api/attendance",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        fetchAttendanceData(); // 출석 성공 시 데이터를 새로고침
      } else {
        console.error("Error checking attendance:", response.data.message);
      }
    } catch (error) {
      console.error("Error posting attendance check:", error);
    }
  };

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="attendance-container">
      <div className="ExplainContainer">
        <div className="Explain">
          <div className="h1">매일 출석 체크하고 포인트를 모아보아요</div>
          <div className="h3">
            출석체크로 모든 포인트를 모으면 다시 생성할 수 있어요
          </div>
        </div>
      </div>
      <div className="points">💰 {points}P</div>

      <div className="attendance-grid">
        {daysOfWeek.map((day, index) => {
          const currentDayData = attendanceData.find((item) =>
            item.dayOfWeek.startsWith(day)
          );

          const isChecked = currentDayData?.status;
          return (
            <div
              key={index}
              className={`day-box ${isChecked ? "checked" : ""}`}
            >
              <span>{day}</span>
              <div className="gift-icon">🎁</div>
            </div>
          );
        })}
      </div>

      <button onClick={handleAttendanceCheck} className="check-btn">
        출석 체크하기
      </button>
    </div>
  );
};

export default Attendance;
