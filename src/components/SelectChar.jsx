import React, { useState, useEffect } from "react";
import apiClient from "./apiClient"; // apiClient 경로 확인
import CharacterListModal from "./CharacterListModal";
import CharBox from "./CharBox";
import "../styles/SelectChar.css";

const SelectChar = ({ setSelectedChar, setOthers }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedChars, setSelectedChars] = useState([]);
  const [isCharacterListModalOpen, setIsCharacterListModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await apiClient.get("/character");
        if (response.data.isSuccess) {
          const formattedCharacters = response.data.data.map((char) => ({
            id: char.id,
            name: char.name,
            description: char.info,
          }));
          setCharacters(formattedCharacters);
        } else {
          console.error("Failed to fetch characters:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  // 캐릭터 클릭 핸들러
  const handleCharClick = (id) => {
    setSelectedChars((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(id)) {
        updatedSelected = prevSelected.filter((charId) => charId !== id);
      } else {
        updatedSelected = [...prevSelected, id];
      }

      // 메인 캐릭터와 다른 캐릭터들을 설정
      if (updatedSelected.length > 0) {
        setSelectedChar(updatedSelected[0]); // 첫 번째 캐릭터를 메인 캐릭터로 설정
        setOthers(updatedSelected.slice(1)); // 나머지 캐릭터들을 others로 설정
      } else {
        setSelectedChar(null);
        setOthers([]);
      }

      return updatedSelected;
    });
  };

  const handleOpenCharacterListModal = () => {
    setIsCharacterListModalOpen(true);
  };

  const handleCloseCharacterListModal = () => {
    setIsCharacterListModalOpen(false);
  };

  const handleAddCharacter = (newChar) => {
    setCharacters((prevCharacters) => [...prevCharacters, newChar]);
    handleCloseCharacterListModal();
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await apiClient.delete(`/character/${characterId}`);
      setCharacters((prevCharacters) =>
        prevCharacters.filter((char) => char.id !== characterId)
      );
      console.log(`Character with ID ${characterId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting character:", error);
      alert("캐릭터 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEditCharacter = (updatedChar) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.id === updatedChar.id ? updatedChar : char
      )
    );
  };

  return (
    <div className="SelectCharWrapper">
      <div className="h1" style={{ margin: "40px 0px 40px 0px" }}>
        메인 등장인물을 선택해주세요
      </div>
      <div className="CharBoxWrapper">
        {characters.map((char, index) => (
          <CharBox
            key={`${char.id}-${index}`}
            charName={char.name}
            charDescription={char.description}
            isSelected={selectedChars.includes(char.id)}
            isMainChar={selectedChars[0] === char.id}
            onClick={() => handleCharClick(char.id)}
          />
        ))}
      </div>
      <button
        className="OpenCharacterListButton"
        onClick={handleOpenCharacterListModal}
      >
        인물 추가·수정하러 가기
      </button>

      {isCharacterListModalOpen && (
        <CharacterListModal
          characters={characters}
          onClose={handleCloseCharacterListModal}
          onAddCharacter={handleAddCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          onEditCharacter={handleEditCharacter}
        />
      )}
    </div>
  );
};

export default SelectChar;
