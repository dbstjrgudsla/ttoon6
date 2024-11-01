import React from "react";
import "../styles/LoadingModal.css";
import { ReactComponent as LoadingIcon } from "../img/LoadingIcon.svg";

const LoadingModal = ({ onClose }) => {
  return (
    <div className="modal-overlay6">
      <div className="modal-content6" style={{ position: "relative" }}>
        <button
          className="close-button000"
          onClick={() => {
            console.log("닫기 버튼이 클릭되었습니다.");
            if (onClose) {
              onClose();
            } else {
              console.error("onClose 함수가 정의되지 않았습니다.");
            }
          }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <div className="h1" style={{ fontSize: "28px" }}>
          사용자님이 써주신 기록을 바탕으로 <br />네 컷 만화를 그리는 중이에요
        </div>
        <div className="h3">조금만 기다려주시면 금방 완성할게요!</div>
        <div className="spinner-container">
          <div className="Icon3">
            <LoadingIcon />
          </div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
