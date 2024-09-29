import React, { useState, useEffect } from "react";
import { ReactComponent as MainLogo } from "../img/MainLogo.svg";
import "../styles/Header.css";
import LoginModal from "./LoginModal";
import SettingsModal from "./SettingsModal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";

const Header = ({ onSelectTab, currentTab }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSettingModal = () => {
    setSettingModalOpen(true);
  };

  const closeSettingModal = () => {
    setSettingModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    if (typeof onSelectTab === "function") {
      onSelectTab(newValue);
    } else {
      console.error("onSelectTab prop is not a function");
    }
  };

  const handleAddToonClick = () => {
    navigate("/addtoon");
  };

  return (
    <div className="HeaderWrapper">
      {isLoggedIn ? (
        <div className="MainHeaderItem">
          <MainLogo width="136" height="24" />
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "#84889a !important", // 기본 탭 색상
                fontSize: "18px !important",
                fontWeight: "500 !important",
                marginLeft: "44px !important",
                backgroundColor: "transparent !important", // 기본 배경색
              },
              "& .Mui-selected": {
                color: "white !important", // 선택된 탭 색상
                fontWeight: "700 !important",
                backgroundColor: "transparent !important", // 선택된 탭 배경색
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffffff !important", // 인디케이터 색상
              },
            }}
          >
            <Tab label="기록" />
            <Tab label="출석체크" />
            <Tab label="친구관리" />
          </Tabs>
        </div>
      ) : (
        <MainLogo width="136" height="24" />
      )}
      <div className="HeaderMenu">
        {isLoggedIn ? (
          <>
            <div className="HeaderItem">
              <button className="PlusToon" onClick={handleAddToonClick}>
                {" "}
                + 기록 추가하기{" "}
              </button>
            </div>
            <div className="HeaderItem">
              <button
                onClick={openSettingModal}
                className="HeaderSettingsButton"
              >
                설정
              </button>
              <SettingsModal
                isOpen={settingModalOpen}
                onClose={closeSettingModal}
              />
            </div>
          </>
        ) : (
          <div className="HeaderItem">
            <button onClick={openLoginModal} className="HeaderLoginButton">
              시작하기
            </button>
            <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
