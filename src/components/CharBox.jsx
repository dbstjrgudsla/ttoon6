import React, { useState } from "react";
import "../styles/CharBox.css";
import { IoCheckmark } from "react-icons/io5";

const CharBox = () => {
  const [isMainCharVisible, setIsMainCharVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleMainCharVisibility = () => {
    setIsMainCharVisible(!isMainCharVisible);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    // CharBox를 클릭할 때 MainChar의 가시성을 토글합니다.
    if (!isMainCharVisible) {
      setIsMainCharVisible(true); // MainChar를 보이도록 설정
    } else {
      setIsMainCharVisible(false); // MainChar를 숨기도록 설정
    }
  };

  return (
    <div className={`CharBox ${isClicked ? "clicked" : ""}`} onClick={handleClick}>
      <div className="CharName">조혜원</div>
      <div className={`MainChar ${isMainCharVisible ? "visible" : ""}`} onClick={toggleMainCharVisibility}>
        메인캐릭터
      </div>
      <div className="CharComment">
        갈색 긴머리, 20세여성, 한국인, 빨간색 가디건에 검정색 치마
      </div>
      <IoCheckmark />
     
    </div>
  );
};

export default CharBox;
