// SelectChar Component
import React, { useState, useEffect } from "react";
import apiClient from "./apiClient"; // apiClient 경로 확인
import CharacterListModal from "./CharacterListModal";
import CharBox from "./CharBox";
import "../styles/SelectChar.css";

const SelectChar = () => {
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

  const handleCharClick = (id) => {
    setSelectedChars((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((charId) => charId !== id)
        : [...prevSelected, id]
    );
  };

  const handleOpenCharacterListModal = () => {
    setIsCharacterListModalOpen(true);
  };

  const handleCloseCharacterListModal = () => {
    setIsCharacterListModalOpen(false);
  };

  const handleAddCharacter = (newChar) => {
    setCharacters((prevCharacters) => [...prevCharacters, newChar]);
    // 추가 후 selectedChars는 유지
    setSelectedChars((prevSelected) => [...prevSelected]);
    // 모달을 닫고 새로고침하여 자동으로 업데이트 반영
    handleCloseCharacterListModal();
    window.location.reload();
  };

  // 삭제 함수 정의
  const handleDeleteCharacter = async (characterId) => {
    try {
      // DELETE 요청을 보내서 서버에서 캐릭터 삭제
      await apiClient.delete(`/character/${characterId}`);

      // 요청 성공 시 상태에서 해당 캐릭터 제거
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

      {/* CharacterListModal 컴포넌트 */}
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
