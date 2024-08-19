import React, { useState } from "react";
import CharBox from "./CharBox";
import CharPlusModal from "./CharPlusModal";
import "../styles/SelectChar.css";

const SelectChar = () => {
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "조혜원",
      description:
        "갈색 긴 머리, 20세 여성, 한국인, 빨간색 가디건에 검정색 치마",
    },
    {
      id: 2,
      name: "김혜원",
      description:
        "갈색 긴 머리, 20세 여성, 한국인, 빨간색 가디건에 검정색 치마",
    },
    {
      id: 3,
      name: "이혜원",
      description:
        "검정색 긴 생머리, 30세 여성, 한국인, 흰색 브이넥 반팔티에 청바지, 검정색 백팩",
    },
    {
      id: 4,
      name: "박혜원",
      description:
        "갈색 긴 머리, 20세 여성, 한국인, 빨간색 가디건에 검정색 치마",
    },
  ]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCharClick = (id) => {
    setSelectedChar(id);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddCharacter = (newChar) => {
    setCharacters([...characters, newChar]);
    setIsModalOpen(false);
  };

  return (
    <div className="SelectCharWrapper">
      <div className="h1" style={{ margin: "40px 0px 40px 0px" }}>
        메인 등장인물을 선택해주세요
      </div>
      <div className="CharBoxWrapper">
        {characters.map((char) => (
          <CharBox
            key={char.id}
            charName={char.name}
            charDescription={char.description}
            isSelected={selectedChar === char.id}
            onClick={() => handleCharClick(char.id)}
          />
        ))}
      </div>
      <button className="PlusChar" onClick={handleModalOpen}>
        인물 추가·수정하러 가기
      </button>
      <CharPlusModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddCharacter={handleAddCharacter}
      />
    </div>
  );
};

export default SelectChar;
