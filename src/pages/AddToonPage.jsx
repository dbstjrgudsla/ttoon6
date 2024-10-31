import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ReactComponent as Navibar } from "../img/Navibar.svg";
import SelectChar from "../components/SelectChar";
import SelectStyle from "../components/SelectStyle";
import SelectPeo from "../components/SelectPeo";
import Story from "../components/Story";
import LoadingModal from "../components/LoadingModal";
import "../styles/AddToonPage.css";

const AddToonPage = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedChar, setSelectedChar] = useState(null);
  const [personCount, setPersonCount] = useState(1);
  const [diaryContent, setDiaryContent] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [error, setError] = useState(null);

  const handleCompleteClick = () => {
    console.log("완료 버튼이 클릭되었습니다.");
    setShowLoadingModal((prev) => {
      console.log("이전 showLoadingModal 상태:", prev);
      return true;
    });
  };

  const handleCloseModal = () => {
    console.log("모달 닫기 버튼이 클릭되었습니다.");
    setShowLoadingModal(false);
  };

  useEffect(() => {
    console.log("showLoadingModal 상태 변경됨:", showLoadingModal);
  }, [showLoadingModal]);

  useEffect(() => {
    console.log("selectedStyle 변경됨:", selectedStyle);
    console.log("selectedChar 변경됨:", selectedChar);
    console.log("diaryContent 변경됨:", diaryContent);
  }, [selectedStyle, selectedChar, diaryContent]);

  return (
    <>
      <Header onSelectTab={() => {}} currentTab={0} />
      <div className="HomeWrapper">
        <div className="ContentsWrapper1">
          <div className="navigationbar">
            <Navibar style={{ width: "960px", height: "100px" }} />
          </div>
          <SelectStyle
            setSelectedStyle={(value) => {
              console.log("SelectStyle 선택됨:", value);
              setSelectedStyle(value);
            }}
          />
          <SelectChar
            setSelectedChar={(value) => {
              console.log("SelectChar 선택됨:", value);
              setSelectedChar(value);
            }}
          />
          <SelectPeo
            personCount={personCount}
            setPersonCount={(value) => {
              console.log("SelectPeo 사람 수 변경됨:", value);
              setPersonCount(value);
            }}
          />
          <Story
            diaryContent={diaryContent}
            setDiaryContent={(value) => {
              console.log("Story 내용 변경됨:", value);
              setDiaryContent(value);
            }}
          />
          <button
            className="CompleteButton"
            onClick={() => {
              console.log("완료 버튼 onClick 호출됨");
              handleCompleteClick();
            }}
          >
            완료
          </button>
          {error && <div className="error-message">{error}</div>}
          <div style={{ width: "100%", height: "200px", color: "#ebebeb" }}>
            .
          </div>
        </div>
      </div>
      {showLoadingModal && (
        <LoadingModal
          onClose={() => {
            console.log("LoadingModal onClose 호출됨");
            handleCloseModal();
          }}
        />
      )}
    </>
  );
};

export default AddToonPage;
