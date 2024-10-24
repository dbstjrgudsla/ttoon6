import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SettingsModal.css";
import { AiOutlineClose } from "react-icons/ai";
import AccountSettings from "./AccountSettings";
import Language from "./Language";
import InquirySettings from "./InquirySettings";
import Logout from "./Logout"; // 로그아웃 컴포넌트 임포트

const SettingsModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("account"); // 기본 탭은 계정 설정
  const [profileData, setProfileData] = useState({
    nickName: "",
    point: 0,
    imageUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchPoints(); // 모달이 열릴 때마다 포인트 데이터만 가져오기
    }
  }, [isOpen]);

  const fetchPoints = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }

      const response = await axios.get("https://ttoon.site/api/attendance", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { point } = response.data.data;
      setProfileData((prevData) => ({
        ...prevData,
        point, // 포인트만 업데이트
      }));
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleProfileDataUpdate = (data) => {
    setProfileData((prevData) => ({
      ...prevData,
      nickName: data.nickName,
      imageUrl: data.imageUrl,
    }));
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "account":
        return (
          <AccountSettings onUpdateProfileData={handleProfileDataUpdate} />
        );
      case "language":
        return <Language />;
      case "privacy":
        return <div>개인정보처리방침 컨텐츠</div>;
      case "openSource":
        return <div>오픈소스 라이센스</div>;
      case "makers":
        return <div>만든 사람들</div>;
      case "inquiry":
        return <InquirySettings />;
      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="ModalWrapper">
          <div className="Modal">
            <div className="ModalHeader">
              <AiOutlineClose onClick={onClose} className="CloseIcon" />
            </div>
            <div className="ModalBody">
              <div className="SideBar">
                <div className="Profile">
                  <div className="ProfileInfo">
                    <div className="ProfileImage">
                      {profileData.imageUrl ? (
                        <img
                          src={profileData.imageUrl}
                          alt="Profile"
                          className="profile-image"
                        />
                      ) : (
                        <div className="placeholder"></div>
                      )}
                    </div>
                    <div className="ProfileName">
                      {profileData.nickName
                        ? `${profileData.nickName} 님`
                        : "사용자"}
                    </div>
                    <div className="ProfilePoints">
                      {profileData.point !== undefined
                        ? `${profileData.point}P`
                        : "0P"}{" "}
                      {/* 포인트 표시 */}
                    </div>
                  </div>
                </div>
                <div className="SideBarSetting">
                  설정
                  <div className="SideBarSettingItem">
                    <button onClick={() => handleTabChange("account")}>
                      계정 설정
                    </button>
                    <button onClick={() => handleTabChange("language")}>
                      언어 설정
                    </button>
                  </div>
                </div>
                <div className="Information">
                  정보 및 문의
                  <div className="InformationItem">
                    <button onClick={() => handleTabChange("privacy")}>
                      개인정보 처리방침
                    </button>
                    <button onClick={() => handleTabChange("openSource")}>
                      오픈 소스
                    </button>
                    <button onClick={() => handleTabChange("makers")}>
                      만든 사람들
                    </button>
                    <button onClick={() => handleTabChange("inquiry")}>
                      문의하기
                    </button>
                  </div>
                  {/* 로그아웃 컴포넌트를 적용 */}
                  <Logout />
                </div>
              </div>
              <div className="SettingsContents">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;
