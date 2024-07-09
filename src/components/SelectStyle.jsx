import React from "react";
import '../styles/SelectStyle.css'
const SelectStyle =() =>{

    return(
        <div className="SelectStyleWrapper">
        <div className="h1" style={{margin : '40px 0px 20px 0px'}}> 어떤 그림체로 하루를 기록할까요?</div>
        <div className="h3">골라주신 그림체로 오늘 하루를 담은 네컷만화를 그려드릴께요</div>
        <div className="DrawingStyle">
            <div className="box">그림체 1번</div>
            <div className="box">그림체 2번</div>
            <div className="box">그림체 3번</div>
        </div>
        </div>
    )
}
export default SelectStyle;