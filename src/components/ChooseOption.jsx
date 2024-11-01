import React, { useState, useEffect } from "react";
import "../styles/ChooseOption.css";
import { ReactComponent as ChooseHeader1 } from "../img/ChooseHeader1.svg";
import { ReactComponent as ChooseHeader2 } from "../img/ChooseHeader2.svg";
import { ReactComponent as ChooseHeader3 } from "../img/ChooseHeader3.svg";
import { ReactComponent as ChooseHeader4 } from "../img/ChooseHeader4.svg";
import apiClient from "./apiClient"; // apiClient를 사용하여 요청

const ChooseOption = ({ accessToken }) => {
  const [selectedImages, setSelectedImages] = useState([1, 2, 3, 4]); // 각 컷 선택 저장
  const [currentCut, setCurrentCut] = useState(0); // 현재 컷 인덱스
  const [isComplete, setIsComplete] = useState(false); // 완료 상태
  const [nickName, setNickName] = useState(""); // 사용자 닉네임
  const imageOptions = [1, 2, 3]; // 이미지 옵션

  // 현재 날짜 가져오기
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${(
      "0" + date.getDate()
    ).slice(-2)}`;
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.isSuccess) {
          setNickName(response.data.data.nickName);
        } else {
          console.error("Failed to fetch user data:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, [accessToken]);

  // 이미지 선택 핸들러
  const handleImageSelect = (image) => {
    const updatedImages = [...selectedImages];
    updatedImages[currentCut] = image; // 현재 컷에 선택된 이미지 저장
    setSelectedImages(updatedImages);
  };

  // 다음으로 버튼 핸들러
  const handleNext = () => {
    if (currentCut < 3) {
      setCurrentCut(currentCut + 1); // 다음 컷으로 이동
    } else {
      setIsComplete(true); // 네 번째 컷 이후 완료 상태로 전환
    }
  };

  // 이전으로 버튼 핸들러
  const handlePrev = () => {
    if (currentCut > 0) {
      setCurrentCut(currentCut - 1); // 이전 컷으로 이동
    }
  };

  // 현재 컷에 따라 SVG 헤더를 렌더링
  const renderHeader = () => {
    switch (currentCut) {
      case 0:
        return <ChooseHeader1 />;
      case 1:
        return <ChooseHeader2 />;
      case 2:
        return <ChooseHeader3 />;
      case 3:
        return <ChooseHeader4 />;
      default:
        return null;
    }
  };

  // 완료 버튼 클릭 시 최종 선택 화면 렌더링
  const renderCompletionView = () => (
    <div className="completion-view">
      <div className="h1" style={{ marginTop: "20px", marginBottom: "20px" }}>
        {nickName}님의 네컷 만화가 완료되었어요!
      </div>
      <div className="CompleteWrapper">
        <p
          className="completion-date"
          style={{ marginRight: "450px", fontWeight: "700" }}
        >
          {getCurrentDate()}
        </p>
        <div className="selected-images-grid" style={{ paddingBottom: "30px" }}>
          {selectedImages.map((image, index) => (
            <div key={index} className="cut">
              <img
                src={`path_to_image/image${image}.png`} // 선택한 이미지 경로
                alt={`컷 ${index + 1}`}
                className="selected-image"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="buttons" style={{ marginTop: "30px" }}>
        <button className="cancelButton">다시 생성하기</button>
        <button className="confirmButton">이대로 저장하기</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="choose-option-wrapper">
        {isComplete ? (
          renderCompletionView() // 완료 상태일 때 선택한 컷을 보여주는 화면
        ) : (
          <>
            {renderHeader()}
            <div className="KKK">
              <div className="h1" style={{ marginTop: "40px " }}>
                가장 마음에 드는 옵션을 골라주세요
              </div>
              <div className="pp">
                만화의 한 장면 당 3가지 옵션 중 고를 수 있어요
              </div>

              <div className="four-cuts">
                {[0, 1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className={`cut ${selectedImages[index] ? "selected" : ""}`}
                  >
                    <span>{selectedImages[index] || index + 1}</span>
                    {/* 선택된 이미지 번호 표시 */}
                  </div>
                ))}
              </div>

              <div className="image-options">
                {imageOptions.map((option) => (
                  <div
                    key={option}
                    className={`option ${
                      selectedImages[currentCut] === option ? "active" : ""
                    }`}
                    onClick={() => handleImageSelect(option)}
                  >
                    <span>{option}</span> {/* 이미지 번호 표시 */}
                  </div>
                ))}
              </div>
            </div>
            <div className="buttons">
              <button className="cancelButton" onClick={handlePrev}>
                이전으로
              </button>
              <button className="confirmButton" onClick={handleNext}>
                {currentCut === 3 ? "완료" : "다음으로"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChooseOption;
