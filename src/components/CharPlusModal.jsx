import "../styles/CharPlusModal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const CharPlusModal = ({ isOpen, onClose, onAddCharacter }) => {
  const maxLength = 20; // 최대 입력 가능한 문자 수
  const [name, setName] = useState(""); // 이름 입력 상태

  const [char, setChar] = useState(""); // 입력된 이야기를 상태로 관리

  const handleChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setChar(text);
    }
  };

  const handleSubmit = () => {
    if (name && char) {
      const newChar = {
        id: Date.now(), // 고유 ID 생성
        name,
        description: char,
      };
      onAddCharacter(newChar); // 부모 컴포넌트로 새로운 인물 추가 요청
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
              placeholder="홍길동"
              style={{
                width: "200px",
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
              placeholder="등장인물 특징을 입력해주세요.&#13;예)검정 생머리, 20살 여자, 청바지의 흰 반팔티"
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
