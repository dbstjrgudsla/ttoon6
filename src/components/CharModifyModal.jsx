// CharModifyModal Component
import "../styles/CharPlusModal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import apiClient from "./apiClient"; // 경로 확인 필요

const CharModifyModal = ({ isOpen, onClose, character, onConfirm }) => {
  const maxLength = 100;
  const [name, setName] = useState(character.name || "");
  const [charDescription, setCharDescription] = useState(
    character.description || ""
  );
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setName(character.name);
    setCharDescription(character.description);
  }, [character]);

  const handleChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setCharDescription(text);
    }
    checkIfModified(character.name, name, character.description, text);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    checkIfModified(
      character.name,
      event.target.value,
      character.description,
      charDescription
    );
  };

  const checkIfModified = (
    originalName,
    newName,
    originalDescription,
    newDescription
  ) => {
    setIsModified(
      originalName !== newName || originalDescription !== newDescription
    );
  };

  const handleSubmit = async () => {
    if (!isModified) return;

    try {
      await apiClient.patch("/character", {
        id: character.id,
        name,
        info: charDescription,
      });

      const updatedChar = {
        id: character.id,
        name,
        description: charDescription,
      };

      onConfirm(updatedChar);
      onClose();
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <AiOutlineClose
            style={{ color: "#9c9c9c", width: "27px", height: "36px" }}
          />
        </button>
        <div className="h1" style={{ marginTop: "40px" }}>
          등록한 등장인물을 수정해주세요
        </div>
        <div className="TotalContents">
          <div className="NameArea">
            <div className="a11">이름</div>
            <input
              type="text"
              placeholder="예) 홍길동"
              value={name}
              onChange={handleNameChange}
              style={{
                height: "46px",
                borderRadius: "10px",
                backgroundColor: "#F7F7FA",
                border: "none",
                fontSize: "16px",
                outlineColor: "#FF903F",
              }}
            />
          </div>
          <div className="CharArea">
            <div className="a12">등장인물 특징</div>
            <textarea
              maxLength={maxLength}
              className="CharTextArea"
              value={charDescription}
              onChange={handleChange}
              placeholder="등장인물 특징을 입력해주세요.\n예) 검정 생머리, 20살 여자, 청바지의 흰 반팔티"
              style={{
                borderRadius: "10px",
                backgroundColor: "#F7F7FA",
                border: "none",
                fontSize: "16px",
                outlineColor: "#FF903F",
                padding: "10px",
                resize: "none",
              }}
            ></textarea>
          </div>
          <div className="Submit">
            <button
              className="modal-submit"
              onClick={handleSubmit}
              disabled={!isModified} // 수정되지 않은 경우 비활성화
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharModifyModal;
