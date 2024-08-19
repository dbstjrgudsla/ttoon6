import React, { useState, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header";
import { ReactComponent as Navibar } from "../img/Navibar.svg";
import SelectChar from "../components/SelectChar";
import SelectStyle from "../components/SelectStyle";
import SelectPeo from "../components/SelectPeo";
import Story from "../components/Story";
import "../styles/AddToonPage.css";

const AddToonPage = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedChar, setSelectedChar] = useState(null);
  const [personCount, setPersonCount] = useState(1);
  const [diaryContent, setDiaryContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleComplete = useCallback(async () => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    const data = {
      style: selectedStyle,
      characterList: [selectedChar],
      number: personCount,
      content: diaryContent,
    };

    try {
      await axios.post("https://ttoon.site/api/createtoon", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Success");
    } catch (error) {
      setError("Error: Unable to complete the request.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedStyle, selectedChar, personCount, diaryContent]);

  const isButtonDisabled = !selectedStyle || !selectedChar || !diaryContent;

  return (
    <>
      <Header onSelectTab={() => {}} currentTab={0} />{" "}
      {/* onSelectTab 및 currentTab 설정 */}
      <div className="HomeWrapper">
        <div className="ContentsWrapper1">
          <div className="navigationbar">
            <Navibar style={{ width: "960px", height: "100px" }} />
          </div>
          <SelectStyle setSelectedStyle={setSelectedStyle} />
          <SelectChar setSelectedChar={setSelectedChar} />
          <SelectPeo
            personCount={personCount}
            setPersonCount={setPersonCount}
          />
          <Story
            diaryContent={diaryContent}
            setDiaryContent={setDiaryContent}
          />
          <button
            className="CompleteButton"
            onClick={handleComplete}
            disabled={isButtonDisabled || loading}
          >
            {loading ? "Loading..." : "완료"}
          </button>
          {error && <div className="error-message">{error}</div>}
          <div style={{ width: "100%", height: "200px", color: "#ebebeb" }}>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToonPage;
