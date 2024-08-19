import React, { useState } from 'react';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import '../styles/Counter.css';

const Counter =() => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) { // 현재 count가 0보다 클 때만 감소하도록 조건 추가
        setCount(count - 1);
      }
  };

  return (
    <div className='CounterWrapper' style={{display :'flex', marginTop : '20px', marginBottom:'20px'}}>
      <button className = "button"onClick={decrement} ><CiCircleMinus /></button>
      <p className='CountNum'>{count}명</p>
      <button className="button" onClick={increment}><CiCirclePlus /></button>
      
    </div>
  );
}

export default Counter;
