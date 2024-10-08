import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/TermsPage.css";

const TermsPage = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(true);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedIsGuest = localStorage.getItem("isGuest");

    if (accessToken && refreshToken && storedIsGuest) {
      setIsGuest(storedIsGuest === "true");
    }
  }, []);

  const handleTermsAgreement = async () => {
    const accessToken = localStorage.getItem("accessToken");

    console.log("닉네임:", nickName);
    console.log("액세스 토큰:", accessToken);

    try {
      const response = await axios.post(
        "https://ttoon.site/api/join",
        { nickName }, // Include the nickname in the request body
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("응답 데이터:", response.data);

      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isGuest", "false"); // 약관 동의 시 게스트 상태 해제
        setIsGuest(false); // 로컬 상태 업데이트
        navigate("/home"); // 약관 동의 후 메인 페이지로 이동
      } else {
        console.error("약관 동의 실패:", response.data.message);
      }
    } catch (error) {
      console.error("약관 동의 중 오류 발생:", error);
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

        <button className="grep" onClick={handleTermsAgreement}>
          완료
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
