// Counter.jsx
import React from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import "../styles/Counter.css";

const Counter = ({ count, setCount }) => {
  const increment = () => {
    if (count < 10) {
      // 최대 인원 수 제한 설정
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      // 최소 인원 수는 1로 제한
      setCount(count - 1);
    }
  };

  return (
    <div
      className="CounterWrapper"
      style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
    >
      <button className="button" onClick={decrement}>
        <CiCircleMinus />
      </button>
      <p className="CountNum">{count}명</p>
      <button className="button" onClick={increment}>
        <CiCirclePlus />
      </button>
    </div>
  );
};

export default Counter;
