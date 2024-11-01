import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ReactComponent as Navibar } from "../img/Navibar.svg";
import SelectChar from "../components/SelectChar";
import SelectStyle from "../components/SelectStyle";
import SelectPeo from "../components/SelectPeo";
import Story from "../components/Story";
import LoadingModal from "../components/LoadingModal";
import ChooseOption from "../components/ChooseOption";
import "../styles/AddToonPage.css";

const AddToonPage = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedChar, setSelectedChar] = useState(null);
  const [personCount, setPersonCount] = useState(1);
  const [diaryContent, setDiaryContent] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showChooseOption, setShowChooseOption] = useState(false);

  // 완료 버튼 클릭 핸들러
  const handleCompleteClick = () => {
    console.log("완료 버튼이 클릭되었습니다.");
    setShowLoadingModal(true); // LoadingModal을 표시
    setShowChooseOption(false); // ChooseOption을 숨김
  };

  // LoadingModal이 true일 때 2초 후에 자동으로 ChooseOption으로 전환
  useEffect(() => {
    if (showLoadingModal) {
      console.log("LoadingModal 상태가 true로 설정됨");
      const timer = setTimeout(() => {
        console.log("모달 자동 닫힘 및 ChooseOption 표시");
        setShowLoadingModal(false); // LoadingModal을 닫음
        setShowChooseOption(true); // ChooseOption을 표시
      }, 2000);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [showLoadingModal]);

  const handleCloseModal = () => {
    console.log("모달 닫기 버튼이 클릭되었습니다.");
    setShowLoadingModal(false);
    setShowChooseOption(false); // 수동으로 닫으면 ChooseOption을 표시하지 않음
  };

  return (
    <>
      <Header onSelectTab={() => {}} currentTab={0} />
      {console.log("렌더링 중 - showLoadingModal:", showLoadingModal)}{" "}
      {/* 디버깅용 로그 */}
      {console.log("렌더링 중 - showChooseOption:", showChooseOption)}{" "}
      {/* 디버깅용 로그 */}
      {!showChooseOption ? (
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
            <button className="CompleteButton" onClick={handleCompleteClick}>
              완료
            </button>
            <div style={{ width: "100%", height: "200px", color: "#ebebeb" }}>
              .
            </div>
          </div>
        </div>
      ) : (
        <ChooseOption />
      )}
      {/* showLoadingModal이 true일 때 LoadingModal을 표시 */}
      {showLoadingModal && (
        <>
          {console.log("LoadingModal이 표시됩니다.")}
          <LoadingModal onClose={handleCloseModal} />
        </>
      )}
    </>
  );
};

export default AddToonPage;
