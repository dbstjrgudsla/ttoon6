import React, { useState } from "react";
import "../styles/SettingsModal.css";
import { AiOutlineClose } from "react-icons/ai";
import AccountSettings from "./AccountSettings";
import Language from "./Language";
import InquirySettings from "./InquirySettings";

const SettingsModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("account"); // 기본 탭은 계정 설정

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // 선택된 탭에 따라 해당하는 컨텐츠를 반환
  const renderTabContent = () => {
    switch (selectedTab) {
      case "account":
        return (
          <div className="AccountSettings">
            <AccountSettings />
          </div>
        );
      case "language":
        return (
          <div className="LanguageSettings">
            <Language />
          </div>
        );
      case "privacy":
        return <div className="PrivacySettings">개인정보처리방침 컨텐츠</div>;
      case "openSource":
        return <div className="OpenSourceSettings">오픈소스 컨텐츠</div>;
      case "makers":
        return <div className="MakersSettings">만든 사람들 컨텐츠</div>;
      case "inquiry":
        return (
          <div className="InquirySettings">
            <InquirySettings />
          </div>
        );
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
                  {/* 프로필 정보 */}
                  <div className="ProfileInfo">
                    <div className="ProfileImage"></div>
                    <div className="ProfileName">지윤석 님</div>
                    <div className="ProfilePoints">200P</div>
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
