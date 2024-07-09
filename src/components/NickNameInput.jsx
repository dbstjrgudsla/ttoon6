// NickNameInput.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NicknameInput = ({ initialNickname }) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [charCount, setCharCount] = useState(initialNickname.length);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchNickname(token);
    } else {
      console.log("로그인 토큰이 없습니다. 로그인이 필요합니다.");
      // 필요에 따라 로그인 페이지로 이동하거나 다른 처리를 수행합니다.
    }
  }, []);

  const fetchNickname = async (token) => {
    try {
      const response = await axios.get('https://ttoon.site/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.isSuccess) {
        setNickname(response.data.data.nickName);
        setCharCount(response.data.data.nickName.length);
      } else {
        console.error('Error fetching nickname:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching nickname:', error);
    }
  };

  const handleInputChange = (e) => {
    setNickname(e.target.value);
    setCharCount(e.target.value.length);
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
            maxLength={14}
          />
          <div>{charCount}/14자</div>
        </>
      ) : (
        <div>로그인이 필요합니다.</div>
      )}
    </div>
  );
};

export default NicknameInput;
