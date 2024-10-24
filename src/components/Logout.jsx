import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate로 변경
import "../styles/Logout.css";
const Logout = () => {
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handleLogout = () => {
    // 인증 토큰 삭제 (예: localStorage에서)
    localStorage.removeItem("accessToken");

    // 로그아웃 후 로그인 페이지로 리디렉션
    navigate("/");
  };

  return (
    <div className="logoutbutton" onClick={handleLogout}>
      로그아웃
    </div>
  );
};

export default Logout;
