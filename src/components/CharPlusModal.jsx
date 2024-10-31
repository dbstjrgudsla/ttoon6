import "../styles/CharPlusModal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import apiClient from "./apiClient"; // 경로 확인 필요

const CharPlusModal = ({ isOpen, onClose, onAddCharacter }) => {
  const maxLength = 100; // 최대 입력 가능한 문자 수
  const [name, setName] = useState(""); // 이름 입력 상태
  const [char, setChar] = useState(""); // 등장인물 특징 상태

  const handleChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setChar(text);
    }
  };

  const handleSubmit = async () => {
    if (name && char) {
      try {
        const response = await apiClient.post("/character", {
          name,
          info: char,
        });

        if (response.data.isSuccess) {
          const newChar = {
            id: response.data.figure,
            name,
            description: char,
          };

          onAddCharacter(newChar); // 한 번만 호출하도록 확인
          setName("");
          setChar("");
          onClose();
        } else {
          console.error("Failed to add character:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding character:", error);
      }
    } else {
      alert("이름과 특징을 모두 입력해주세요.");
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
          새로운 등장인물에 대해 알려주세요
        </div>
        <div className="TotalContents">
          <div className="NameArea">
            <div className="a11">이름</div>
            <input
              type="text"
              placeholder="예) 홍길동"
              style={{
                height: "46px",
                borderRadius: "10px",
                backgroundColor: "#F7F7FA",
                border: "none",
                fontSize: "16px",
                outlineColor: "#FF903F",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="CharArea">
            <div className="a12">등장인물 특징</div>
            <textarea
              maxLength={maxLength}
              className="CharTextArea"
              value={char}
              onChange={handleChange}
              placeholder={`등장인물 특징을 입력해주세요.\n예) 검정 생머리, 20살 여자, 청바지의 흰 반팔티`}
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
            <button className="modal-submit" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharPlusModal;
