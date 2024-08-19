// LoginModal.js

import { ReactComponent as ToonLog } from "../img/ToonLog.svg";
import "../styles/LoginModal.css";
import { AiOutlineClose } from "react-icons/ai";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLogin";
import AppleLogin from "./AppleLogin";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    console.log("Login Success Data:", data);
    const { accessToken, refreshToken, isGuest } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("isGuest", isGuest);

    if (isGuest === "true") {
      navigate("/terms");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const isGuest = params.get("isGuest");

    if (accessToken && refreshToken && isGuest !== null) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isGuest", isGuest);

      console.log("Stored Tokens:", { accessToken, refreshToken, isGuest });

      if (isGuest === "true") {
        navigate("/terms");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  return (
    <>
      {isOpen && (
        <div className="modalWrapper">
          <div className="modal">
            <div className="modalContent">
              <div className="closeButton">
                <AiOutlineClose
                  onClick={onClose}
                  style={{ color: "#9c9c9c", width: "36px", height: "36px" }}
                />
              </div>
              <ToonLog
                width="168"
                height="120"
                style={{ marginLeft: "35%", marginTop: "6%" }}
              />
              <div
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "44px",
                  fontWeight: "600",
                  marginTop: "32px",
                }}
              >
                ToonLog 시작하기
              </div>
              <div
                style={{
                  color: "#949494",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "500",
                  marginTop: "13px",
                }}
              >
                평범한 하루를 특별한 만화로 기록해보아요
              </div>
              <div className="SocialLogin">
                <AppleLogin onSuccess={handleLoginSuccess} />
                <KakaoLogin onSuccess={handleLoginSuccess} />
                <GoogleLogin onSuccess={handleLoginSuccess} />
              </div>
              <div className="Policy">
                이용약관 &nbsp; | &nbsp; 개인정보처리방침
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
