import { useState } from "react";
import "../styles/Story.css";

const Story = ({ setTopic, setStoryContents }) => {
  const maxLength = 150; // 내용의 최대 입력 가능한 문자 수
  const maxTopicLength = 20; // 제목의 최대 입력 가능한 문자 수

  const [topic, updateTopic] = useState(""); // 제목 상태
  const [topicWarning, setTopicWarning] = useState(false); // 제목 경고 상태

  // 각 textarea의 내용을 따로 관리하는 상태
  const [story1, setStory1] = useState("");
  const [story2, setStory2] = useState("");
  const [story3, setStory3] = useState("");
  const [story4, setStory4] = useState("");

  const [storyWarning1, setStoryWarning1] = useState(false);
  const [storyWarning2, setStoryWarning2] = useState(false);
  const [storyWarning3, setStoryWarning3] = useState(false);
  const [storyWarning4, setStoryWarning4] = useState(false);

  // 제목 변경 핸들러
  const handleTopicChange = (event) => {
    const text = event.target.value;
    setTopicWarning(text.length > maxTopicLength);
    updateTopic(text);
    setTopic(text); // 부모 컴포넌트에 제목 전달
  };

  // 이야기 변경 핸들러
  const handleStoryChange = (setStory, setWarning, index, event) => {
    const text = event.target.value;
    setWarning(text.length > maxLength);
    setStory(text);

    // 부모 컴포넌트에 전체 이야기 내용을 배열로 전달
    const updatedContents = [story1, story2, story3, story4];
    updatedContents[index] = text;
    setStoryContents(updatedContents);
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
          rows={2}
        />
        <div
          className="CharacterCount"
          style={{ color: topicWarning ? "red" : "#A9ABBB" }}
        >
          {topic.length}/{maxTopicLength}자
        </div>
      </div>
      <div className="TextWrapper">
        <div className="TextAreaContainer">
          <textarea
            className="TextArea1"
            value={story1}
            onChange={(e) =>
              handleStoryChange(setStory1, setStoryWarning1, 0, e)
            }
            rows={5}
            placeholder="오늘 하루 중, 만화의 첫번째 장면에 들어갈 내용을 들려주세요."
            maxLength={maxLength}
          />
          <div
            className="CharacterCount"
            style={{ color: storyWarning1 ? "red" : "#A9ABBB" }}
          >
            {story1.length}/{maxLength}자
          </div>
        </div>

        <div className="TextAreaContainer">
          <textarea
            className="TextArea2"
            value={story2}
            onChange={(e) =>
              handleStoryChange(setStory2, setStoryWarning2, 1, e)
            }
            rows={5}
            placeholder="오늘 하루 중, 만화의 두번째 장면에 들어갈 내용을 들려주세요."
            maxLength={maxLength}
          />
          <div
            className="CharacterCount"
            style={{ color: storyWarning2 ? "red" : "#A9ABBB" }}
          >
            {story2.length}/{maxLength}자
          </div>
        </div>

        <div className="TextAreaContainer">
          <textarea
            className="TextArea3"
            value={story3}
            onChange={(e) =>
              handleStoryChange(setStory3, setStoryWarning3, 2, e)
            }
            rows={5}
            placeholder="오늘 하루 중, 만화의 세번째 장면에 들어갈 내용을 들려주세요."
            maxLength={maxLength}
          />
          <div
            className="CharacterCount"
            style={{ color: storyWarning3 ? "red" : "#A9ABBB" }}
          >
            {story3.length}/{maxLength}자
          </div>
        </div>

        <div className="TextAreaContainer">
          <textarea
            className="TextArea4"
            value={story4}
            onChange={(e) =>
              handleStoryChange(setStory4, setStoryWarning4, 3, e)
            }
            rows={5}
            placeholder="오늘 하루 중, 만화의 네번째 장면에 들어갈 내용을 들려주세요."
            maxLength={maxLength}
          />
          <div
            className="CharacterCount"
            style={{ color: storyWarning4 ? "red" : "#A9ABBB" }}
          >
            {story4.length}/{maxLength}자
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
