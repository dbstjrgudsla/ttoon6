import React from "react";
import "../styles/CharBox.css";
import { IoCheckmark } from "react-icons/io5";

const CharBox = ({ charName, charDescription, isSelected, onClick }) => {
  return (
    <div className={`CharBox ${isSelected ? "clicked" : ""}`} onClick={onClick}>
      <div className="CharName">{charName}</div>
      <div className={`MainChar ${isSelected ? "visible" : ""}`}>
        메인 캐릭터
      </div>
      <div className="CharComment">{charDescription}</div>
      {isSelected && <IoCheckmark style={{ color: "#FF309F" }} />}
    </div>
  );
};

export default CharBox;
