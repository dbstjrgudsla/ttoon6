import React from "react";
import '../styles/SelectPeo.css'
const SelectPeo = () =>{

    return(
        <div className="SelectPeoWrapper">
        <div className="h1"style ={{margin : '40px 0px 20px 0px'}}>등장하는 인원 수를 선택해주세요</div>
        <div className="h3"> 최대 0명까지 입력해주세요.</div>
        </div>
    )
}
export default SelectPeo;