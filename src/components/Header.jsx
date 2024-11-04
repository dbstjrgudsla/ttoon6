import React, { useState, useEffect } from "react";
import { ReactComponent as MainLogo } from "../img/MainLogo.svg";
import "../styles/Header.css";
import LoginModal from "./LoginModal";
import SettingsModal from "./SettingsModal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import apiClient from "./apiClient"; // API 클라이언트 임포트
import defaultProfileImage from "../img/DefaultProfile.svg"; // 기본 프로필 이미지
import { IoIosArrowDown } from "react-icons/io";

const Header = ({ onSelectTab, currentTab }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // 초기에는 null로 설정
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      fetchProfileData(accessToken);
    }
  }, []);

  // 프로필 데이터를 가져오는 함수
  const fetchProfileData = async (token) => {
    try {
      const response = await apiClient.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Profile API Response:", response.data); // API 응답 확인을 위한 로그

      if (response.data.isSuccess) {
        const profileUrl = response.data.data.imageUrl; // 속성 이름 수정 (url -> imageUrl)
        if (profileUrl) {
          setProfileImage(profileUrl);
        } else {
          setProfileImage(defaultProfileImage);
        }
      } else {
        console.error("Failed to fetch profile data:", response.data.message);
        setProfileImage(defaultProfileImage); // 실패 시 기본 이미지 설정
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setProfileImage(defaultProfileImage); // 오류 발생 시 기본 이미지 설정
    }
  };

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

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className="HeaderWrapper">
      {isLoggedIn ? (
        <div className="MainHeaderItem">
          <MainLogo
            width="136"
            height="24"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "#84889a !important",
                fontSize: "18px !important",
                fontWeight: "500 !important",
                marginLeft: "44px !important",
                backgroundColor: "transparent !important",
              },
              "& .Mui-selected": {
                color: "white !important",
                fontWeight: "700 !important",
                backgroundColor: "transparent !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffffff !important",
              },
            }}
          >
            <Tab label="기록" />
            <Tab label="출석체크" />
            <Tab label="친구관리" />
          </Tabs>
        </div>
      ) : (
        <MainLogo
          width="136"
          height="24"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
      )}
      <div className="HeaderMenu">
        {isLoggedIn ? (
          <>
            <div className="HeaderItem">
              <button className="PlusToon" onClick={handleAddToonClick}>
                + 기록 추가하기
              </button>
            </div>
            <div className="HeaderItem2">
              {/* 프로필 사진을 설정 버튼 대신 추가 */}
              <img
                src={profileImage || defaultProfileImage}
                alt="Profile"
                className="ProfileImage2"
                onClick={openSettingModal}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
              <IoIosArrowDown
                onClick={openSettingModal}
                style={{
                  width: "25px",
                  color: "#CDCED6",

                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
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
