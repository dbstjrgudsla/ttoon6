import React, { useState } from "react";
import '../styles/Contents.css';
import LoginModal from "./LoginModal";


const Contents = () => {

    const [modalOpen, setModalOpen] = useState(false);

    // 모달 열기 이벤트 핸들러
    const openModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 이벤트 핸들러
    const closeModal = () => {
        setModalOpen(false);
    };



    return(
        <div className="ContentsWrappers">
            <div className="intro"> 네컷만화로 기록하는 나의 하루, TTOON</div>
            <div className="subintro">생생한 4컷만화로 기록하는 나의 하루들, 차곡차곡 쌓이는 나만의 일기장</div>
            <button onClick={openModal} className="LoginButton"> 바로 시작하기</button>
            <LoginModal isOpen={modalOpen} onClose={closeModal} />
        </div>


        


    );

}
export default Contents;