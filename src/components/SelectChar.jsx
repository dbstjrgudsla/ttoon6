import React from "react";
import CharBox from "./CharBox";
import '../styles/SelectChar.css'
const SelectChar =() =>{

    return(
        <div className="SelectCharWrapper">
        <div className="h1" style={{margin:'40px 0px 40px 0px'}}>메인 등장인물을 선택해주세요</div>
        <div className="CharBoxWrapper">
        <CharBox />
        <CharBox />
        <CharBox />
        <CharBox />
        </div>
        <button className="PlusChar">인물 추가·수정하러 가기</button>
        </div>
    )
}

export default SelectChar;