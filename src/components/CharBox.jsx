import React from "react";
import "../styles/CharBox.css";
import { IoCheckmark } from "react-icons/io5";

const CharBox = ({
  charName,
  charDescription,
  isSelected,
  isMainChar,
  onClick,
}) => {
  return (
    <div className={`CharBox ${isSelected ? "clicked" : ""}`} onClick={onClick}>
      <div className="CharName">{charName}</div>
      {isMainChar && <div className="MainChar visible">메인 캐릭터</div>}
      <div className="CharComment">{charDescription}</div>
      {isSelected && <IoCheckmark style={{ color: "#FF309F" }} />}{" "}
      {/* Show checkmark for all selected characters */}
    </div>
  );
};

export default CharBox;
