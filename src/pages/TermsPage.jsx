import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/TermsPage.css";

const TermsPage = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(true);
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");

  // 컴포넌트가 처음 로드될 때 토큰을 확인하고, 상태를 업데이트
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedIsGuest = localStorage.getItem("isGuest");

    if (accessToken && refreshToken && storedIsGuest) {
      setIsGuest(storedIsGuest === "true");
    }
  }, []);

  // isGuest 상태가 false로 변경되면 메인 페이지로 이동
  useEffect(() => {
    if (!isGuest) {
      navigate("/home");
    }
  }, [isGuest, navigate]);

  // 닉네임 입력 후 약관 동의 처리
  const handleTermsAgreement = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "https://ttoon.site/api/join",
        { nickName }, // 닉네임을 요청 바디에 포함
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.isSuccess) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("isGuest", "false");
        setIsGuest(false); // 상태 업데이트 후 useEffect에서 페이지 이동
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
