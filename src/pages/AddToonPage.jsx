// AddToonPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import { ReactComponent as Navibar } from "../img/Navibar.svg";
import SelectChar from "../components/SelectChar";
import SelectStyle from "../components/SelectStyle";
import SelectPeo from "../components/SelectPeo";
import Story from "../components/Story";
import LoadingModal from "../components/LoadingModal";
import ChooseOption from "../components/ChooseOption";
import apiClient from "../components/apiClient";
import "../styles/AddToonPage.css";

const AddToonPage = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedChar, setSelectedChar] = useState(null);
  const [others, setOthers] = useState([]);
  const [personCount, setPersonCount] = useState(1);
  const [topic, setTopic] = useState("");
  const [storyContents, setStoryContents] = useState(["", "", "", ""]);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showChooseOption, setShowChooseOption] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [feedId, setFeedId] = useState(null); // feedId 상태 추가

  // 완료 버튼 클릭 핸들러
  const handleCompleteClick = async () => {
    console.log("완료 버튼이 클릭되었습니다.");
    console.log("선택된 스타일:", selectedStyle);
    console.log("메인 캐릭터:", selectedChar);
    console.log("다른 캐릭터들:", others);
    console.log("인원 수:", personCount);
    console.log("제목:", topic);
    console.log("이야기 내용:", storyContents);

    // 데이터 검증
    if (
      !selectedChar ||
      !Array.isArray(others) ||
      !topic ||
      storyContents.some((content) => !content.trim())
    ) {
      console.error("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    setShowLoadingModal(true);
    setShowChooseOption(false);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await apiClient.post(
        "/toon",
        {
          mainCharacterId: Number(selectedChar),
          others: others.map(Number),
          number: personCount,
          title: topic,
          contentList: storyContents,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        console.log("API 요청 성공:", response.data);
        setImageUrls(response.data.data.imageUrls);

        // feedId 확인용 로그 추가
        const receivedFeedId = response.data.data.feedId;
        console.log("받아온 feedId:", receivedFeedId); // 로그로 확인
        setFeedId(receivedFeedId);
      } else {
        console.error("API 요청 실패:", response.data.message);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    } finally {
      setShowLoadingModal(false);
      setShowChooseOption(true);
    }
  };

  return (
    <>
      <Header onSelectTab={() => {}} currentTab={0} />
      {!showChooseOption ? (
        <div className="HomeWrapper">
          <div className="ContentsWrapper1">
            <div className="navigationbar">
              <Navibar style={{ width: "960px", height: "100px" }} />
            </div>
            <SelectStyle
              setSelectedStyle={(value) => {
                setSelectedStyle(value);
                console.log("스타일이 설정되었습니다:", value);
              }}
            />
            <SelectChar
              setSelectedChar={(value) => {
                setSelectedChar(value);
                console.log("메인 캐릭터가 설정되었습니다:", value);
              }}
              setOthers={(value) => {
                setOthers(value);
                console.log("다른 캐릭터들이 설정되었습니다:", value);
              }}
            />
            <SelectPeo
              personCount={personCount}
              setPersonCount={(value) => {
                setPersonCount(value);
                console.log("인원 수가 설정되었습니다:", value);
              }}
            />
            <Story
              setTopic={(value) => {
                setTopic(value);
                console.log("제목이 설정되었습니다:", value);
              }}
              setStoryContents={(value) => {
                setStoryContents(value);
                console.log("이야기 내용이 설정되었습니다:", value);
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
        // ChooseOption 컴포넌트에 feedId를 정확히 전달
        <ChooseOption
          imageUrls={imageUrls}
          feedId={feedId}
          storyContent={storyContents.join(" ")}
        />
      )}
      {showLoadingModal && (
        <LoadingModal onClose={() => setShowLoadingModal(false)} />
      )}
    </>
  );
};

export default AddToonPage;
