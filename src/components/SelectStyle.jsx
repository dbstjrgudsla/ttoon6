import React, { useState } from "react";
import "../styles/SelectStyle.css";

const SelectStyle = ({ setSelectedStyle }) => {
  const [selectedStyle, setLocalSelectedStyle] = useState(null);

  const handleStyleClick = (style) => {
    setLocalSelectedStyle(style);
    setSelectedStyle(style);
  };

  return (
    <div className="SelectStyleWrapper">
      <div className="h1" style={{ margin: "40px 0px 20px 0px" }}>
        {" "}
        어떤 그림체로 하루를 기록할까요?
      </div>
      <div className="h3">
        골라주신 그림체로 오늘 하루를 담은 네컷만화를 그려드릴께요
      </div>
      <div className="DrawingStyle">
        <button
          className={`styleButton ${selectedStyle === 1 ? "selected" : ""}`}
          onClick={() => handleStyleClick(1)}
        >
          그림체 1번
        </button>
        <button
          className={`styleButton ${selectedStyle === 2 ? "selected" : ""}`}
          onClick={() => handleStyleClick(2)}
        >
          그림체 2번
        </button>
        <button
          className={`styleButton ${selectedStyle === 3 ? "selected" : ""}`}
          onClick={() => handleStyleClick(3)}
        >
          그림체 3번
        </button>
      </div>
    </div>
  );
};

export default SelectStyle;
