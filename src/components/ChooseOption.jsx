import React, { useState, useEffect } from "react";
import "../styles/ChooseOption.css";
import { ReactComponent as ChooseHeader1 } from "../img/ChooseHeader1.svg";
import { ReactComponent as ChooseHeader2 } from "../img/ChooseHeader2.svg";
import { ReactComponent as ChooseHeader3 } from "../img/ChooseHeader3.svg";
import { ReactComponent as ChooseHeader4 } from "../img/ChooseHeader4.svg";
import apiClient from "../components/apiClient"; // API 클라이언트 불러오기

const ChooseOption = ({ imageUrls, feedId, storyContent }) => {
  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [currentCut, setCurrentCut] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [nickName, setNickName] = useState("");
  const todayDate = new Date().toISOString().slice(0, 10); // 오늘의 날짜

  // 프로필 정보 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.get("/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.isSuccess) {
          setNickName(response.data.data.nickName);
        } else {
          console.error("프로필 정보 가져오기 실패:", response.data.message);
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 오류:", error);
      }
    };

    fetchProfile();
  }, []);

  // 이미지 선택 핸들러
  const handleImageSelect = (imageUrl) => {
    const updatedImages = [...selectedImages];
    updatedImages[currentCut] = imageUrl;
    setSelectedImages(updatedImages);
  };

  // 다음 컷으로 이동
  const handleNext = () => {
    if (currentCut < 3) {
      setCurrentCut(currentCut + 1);
    } else {
      setIsComplete(true);
    }
  };

  // 이전 컷으로 이동
  const handlePrev = () => {
    if (currentCut > 0) {
      setCurrentCut(currentCut - 1);
    }
  };

  // 저장 버튼 클릭 핸들러
  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // imageUrls 값을 출력하여 확인
      console.log("전송할 feedId:", feedId);
      console.log("전송할 imageUrls:", selectedImages);

      const requestBody = {
        imageUrls: selectedImages, // 이미지 URL 배열
      };

      // 전송할 요청 본문을 출력하여 확인
      console.log("전송할 요청 본문:", requestBody);

      // API 요청
      const response = await apiClient.post(`/toon/${feedId}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.isSuccess) {
        alert("저장되었습니다!");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다.");
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
    <>
      <h2>{nickName}님의 네컷 만화가 완료되었어요!</h2>
      <div className="completion-view">
        <div
          className="date"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            padding: "10px",
            marginRight: "400px",
          }}
        >
          {todayDate}
        </div>
        <div className="CompleteWrapper">
          <div className="selected-images-grid">
            {selectedImages.map((imageUrl, index) => (
              <div key={index} className="cut">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`컷 ${index + 1}`}
                    className="selected-image"
                  />
                ) : (
                  <div className="placeholder">컷 {index + 1}</div>
                )}
              </div>
            ))}
          </div>
          <div className="story-content">{storyContent}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="cancelButton">다시 생성하기</button>
        <button className="confirmButton" onClick={handleSave}>
          이대로 저장하기
        </button>
      </div>
    </>
  );

  return (
    <div className="choose-option-wrapper">
      {isComplete ? (
        renderCompletionView()
      ) : (
        <div className="ContentsWrapper">
          {renderHeader()}
          <div className="KKK">
            <div className="h1" style={{ marginTop: "30px" }}>
              가장 마음에 드는 옵션을 골라주세요
            </div>
            <div className="h3" style={{ marginBottom: "30px" }}>
              만화의 한 장면 당 3가지 옵션 중 고를 수 있어요
            </div>
            <div className="four-cuts">
              {selectedImages.map((imageUrl, index) => (
                <div key={index} className="cut2">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`컷 ${index + 1}`}
                      className="selected-image"
                    />
                  ) : (
                    <div className="placeholder">컷 {index + 1}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="image-options">
              {imageUrls
                .slice(currentCut * 3, currentCut * 3 + 3)
                .map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`option ${
                      selectedImages[currentCut] === imageUrl ? "active" : ""
                    }`}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <img src={imageUrl} alt={`옵션 ${index + 1}`} />
                  </div>
                ))}
            </div>
          </div>
          <div className="buttons">
            <button className="cancelButton" onClick={handlePrev}>
              이전으로
            </button>
            <button
              className="confirmButton"
              onClick={handleNext}
              style={{ marginBottom: "30px" }}
            >
              {currentCut === 3 ? "완료" : "다음으로"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseOption;
