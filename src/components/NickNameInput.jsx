// NicknameInput.jsx
import React, { useState, useEffect } from "react";

const NicknameInput = ({ initialNickname, onNicknameChange }) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [charCount, setCharCount] = useState(initialNickname.length);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // initialNickname이 변경될 때 nickname 상태를 업데이트
  useEffect(() => {
    setNickname(initialNickname);
    setCharCount(initialNickname.length);
  }, [initialNickname]);

  // nickname이 변경될 때 charCount 업데이트 및 상위 컴포넌트에 변경 알리기
  useEffect(() => {
    setCharCount(nickname.length);
    if (onNicknameChange) {
      onNicknameChange(nickname);
    }
  }, [nickname, onNicknameChange]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      console.log("로그인 토큰이 없습니다.");
    }
  }, []);

  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <input
            type="text"
            className="InputField"
            value={nickname}
            onChange={handleInputChange}
            maxLength={20}
          />
          <div style={{ fontSize: "12px" }}>{charCount}/20자</div>
        </>
      ) : (
        <div>로그인이 필요합니다.</div>
      )}
    </div>
  );
};

export default NicknameInput;
