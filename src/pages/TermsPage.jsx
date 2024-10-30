// src/pages/TermsPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/TermsPage.css";

const TermsPage = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");

  // 닉네임 입력 후 약관 동의 처리
  const handleTermsAgreement = async () => {
    try {
      const response = await axios.post(
        "https://ttoon.site/api/join",
        { nickName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.isSuccess) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;

        // 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("isGuest", "false");

        // 바로 메인 페이지로 이동
        navigate("/home");
      } else {
        console.error("약관 동의 실패:", response.data.message);
        setError("약관 동의에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("약관 동의 중 오류 발생:", error);
      setError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="Wrapper">
      <div className="TermContent">
        <div className="h11">닉네임을 입력해주세요</div>
        <div className="h33">입력한 닉네임은 친구들에게 표시되어요</div>

        <div>
          <input
            className="floppy"
            id="nickName"
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="닉네임을 입력해주세요(최대10자)"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="grep" onClick={handleTermsAgreement}>
          완료
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
