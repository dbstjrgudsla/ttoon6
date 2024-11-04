import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Attendance.css";
import MonOn from "../img/MonOn.svg";
import MonOff from "../img/MonOff.svg";
import TueOn from "../img/TueOn.svg";
import TueOff from "../img/TueOff.svg";
import WedOn from "../img/WedOn.svg";
import WedOff from "../img/WedOff.svg";
import ThuOn from "../img/ThuOn.svg";
import ThuOff from "../img/ThuOff.svg";
import FriOn from "../img/FriOn.svg";
import FriOff from "../img/FriOff.svg";
import SatOn from "../img/SatOn.svg";
import SatOff from "../img/SatOff.svg";
import SunOn from "../img/SunOn.svg";
import SunOff from "../img/SunOff.svg";
import { ReactComponent as Point } from "../img/Point.svg";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [points, setPoints] = useState(0);
  const [isAlreadyChecked, setIsAlreadyChecked] = useState(false); // 출석 체크 여부
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [currentDay, setCurrentDay] = useState(""); // 오늘의 요일

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

      // 오늘 출석 여부 확인 및 한국어 요일 변환
      const today = new Date()
        .toLocaleString("en-US", { weekday: "short" })
        .toUpperCase();
      const dayTranslations = {
        MON: "월요일",
        TUE: "화요일",
        WED: "수요일",
        THU: "목요일",
        FRI: "금요일",
        SAT: "토요일",
        SUN: "일요일",
      };
      setCurrentDay(dayTranslations[today]); // 오늘 요일을 한국어로 설정

      const todayData = attendanceDtoList.find((item) =>
        item.dayOfWeek.startsWith(today)
      );
      if (todayData?.status) {
        setIsAlreadyChecked(true); // 오늘 이미 출석한 경우 비활성화 처리
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleAttendanceCheck = async () => {
    if (isAlreadyChecked) {
      return; // 이미 출석한 경우 아무 작업도 하지 않음
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://ttoon.site/api/attendance",
        {}, // 필요한 데이터가 있다면 이곳에 추가
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        fetchAttendanceData(); // 출석 성공 시 데이터를 새로고침
        setShowModal(true); // 출석 성공 시 모달 표시
      } else {
        alert(response.data.message); // 오류 메시지 알림
        console.error("Error checking attendance:", response.data.message);
      }
    } catch (error) {
      alert("출석 체크 중 오류가 발생했습니다."); // 예외 발생 시 알림
      console.error("Error posting attendance check:", error);
    }
  };

  const closeModal = () => setShowModal(false);

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const svgIcons = {
    MON: { on: MonOn, off: MonOff },
    TUE: { on: TueOn, off: TueOff },
    WED: { on: WedOn, off: WedOff },
    THU: { on: ThuOn, off: ThuOff },
    FRI: { on: FriOn, off: FriOff },
    SAT: { on: SatOn, off: SatOff },
    SUN: { on: SunOn, off: SunOff },
  };

  return (
    <div className="attendance-container">
      <div className="h1Container">
        <div className="h1">매일 출석 체크하고 포인트를 모아보아요</div>
      </div>
      <div className="h3Container">
        <div
          className="h3"
          style={{ fontSize: "20px", fontWeight: "500", color: "#84889A" }}
        >
          출석체크로 모든 포인트를 모으면 다시 생성할 수 있어요
        </div>
      </div>
      <div className="pointngrid">
        <div className="points">
          <Point></Point> {points}P
        </div>
        <div className="attendance-grid">
          {daysOfWeek.map((day, index) => {
            const currentDayData = attendanceData.find((item) =>
              item.dayOfWeek.startsWith(day)
            );

            const isChecked = currentDayData?.status;
            const SvgIcon = isChecked ? svgIcons[day].on : svgIcons[day].off;

            return (
              <div
                key={index}
                className={`day-box ${isChecked ? "checked" : ""}`}
              >
                <img
                  src={SvgIcon}
                  alt={`${day} ${isChecked ? "On" : "Off"}`}
                  className="gift-icon"
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleAttendanceCheck}
        className={`check-btn ${isAlreadyChecked ? "disabled-btn" : ""}`} // 비활성화 시 클래스를 추가
        disabled={isAlreadyChecked} // 이미 출석한 경우 비활성화
      >
        {isAlreadyChecked ? "이미 출석체크 했어요" : "출석 체크하기"}
      </button>

      {/* 출석 완료 모달 */}
      {showModal && (
        <div className="attendance-modal-overlay-unique">
          <div className="attendance-modal-content-unique">
            <button
              className="attendance-modal-close-button-unique"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="attendance-modal-title-unique">
              {currentDay} 출석체크 완료!
            </h2>
            <p className="attendance-modal-message-unique">
              보상으로 100포인트를 지급 받았어요.
            </p>
            <button
              onClick={closeModal}
              className="attendance-modal-confirm-button-unique"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
