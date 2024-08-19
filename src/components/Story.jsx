import { useState } from "react";
import "../styles/Story.css";

const Story = () => {
  const maxLength = 200; // 내용의 최대 입력 가능한 문자 수
  const maxTopicLength = 20; // 제목의 최대 입력 가능한 문자 수
  const [story, setStory] = useState(""); // 입력된 이야기를 상태로 관리
  const [topic, setTopic] = useState(""); // 입력된 제목을 상태로 관리
  const [storyWarning, setStoryWarning] = useState(false); // 내용 경고 상태
  const [topicWarning, setTopicWarning] = useState(false); // 제목 경고 상태

  const handleStoryChange = (event) => {
    const text = event.target.value;
    if (text.length > maxLength) {
      setStoryWarning(true); // 글자 수 초과 시 경고 표시
    } else {
      setStoryWarning(false); // 글자 수 이내 시 경고 해제
    }
    setStory(text); // 상태 업데이트
  };

  const handleTopicChange = (event) => {
    const text = event.target.value;
    if (text.length > maxTopicLength) {
      setTopicWarning(true); // 글자 수 초과 시 경고 표시
    } else {
      setTopicWarning(false); // 글자 수 이내 시 경고 해제
    }
    setTopic(text); // 상태 업데이트
  };

  return (
    <div className="StoryWrapper">
      <div className="h1" style={{ margin: "40px 0px 20px 0px" }}>
        오늘 하루를 기록해주세요
      </div>
      <div className="h3">
        자세히 써주시면 더 정확한 네컷만화를 그리는데 도움이 되어요.
      </div>
      <div className="Topic">
        <textarea
          className="TopicArea"
          value={topic}
          onChange={handleTopicChange}
          placeholder="제목을 입력해주세요"
          maxLength={maxTopicLength}
          rows={2} // 제목 영역의 초기 행 수
        />
        <div
          className="CharacterCount"
          style={{ color: topicWarning ? "red" : "#A9ABBB" }}
        >
          {topic.length}/{maxTopicLength}자
        </div>
      </div>
      <div className="TextWrapper">
        <textarea
          className="TextArea"
          value={story}
          onChange={handleStoryChange}
          rows={5} // 내용 영역의 초기 행 수
          cols={50} // 내용 영역의 초기 열 수
          placeholder="오늘 하루에 대해 자세히 들려주세요."
          maxLength={maxLength} // 최대 길이 설정
        />
        <div
          className="CharacterCount"
          style={{ color: storyWarning ? "red" : "#A9ABBB" }}
        >
          {story.length}/{maxLength}자
        </div>
      </div>
    </div>
  );
};

export default Story;
