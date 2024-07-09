import React, { useState, useEffect } from "react";
import { ReactComponent as MainLogo } from '../img/MainLogo.svg';
import '../styles/Header.css';
import LoginModal from "./LoginModal";
import SettingsModal from "./SettingsModal";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useNavigate  } from 'react-router-dom';

const Header = ({ onSelectTab, currentTab }) => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [settingModalOpen, setSettingModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
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
        onSelectTab(newValue); // 선택된 탭을 부모 컴포넌트로 전달
    };

    const handleAddToonClick = () => {
        navigate('/addtoon'); // 버튼 클릭 시 '/addtoon' 경로로 이동
    };

    return (
        <div className="HeaderWrapper">
            {isLoggedIn ? (
                <div className="MainHeaderItem">
                    <MainLogo width="49" height="50.7"/>
                    <Tabs
                        value={currentTab} // 현재 선택된 탭 인덱스
                        onChange={handleTabChange} // 탭 변경 이벤트 핸들러
                        sx={{
                            '& .MuiTab-root': {
                                color: '#84889a',
                                fontSize: '24px',
                                fontWeight: '500',
                                marginLeft: '44px'
                            },
                            '& .Mui-selected': {
                                color: 'white',
                                fontWeight: '700'
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#ffffff',
                            },
                        }}
                    >
                        <Tab label="내 기록" />
                        <Tab label="출석 체크" />
                    </Tabs>
                </div>
            ) : (
                <MainLogo width="49" height="50.7"/>
            )}
            <div className="HeaderMenu">
                {isLoggedIn ? (
                    <>
                        <div className="HeaderItem">
                        <button className="PlusToon" onClick={handleAddToonClick}> + 기록 추가하기 </button>
                        </div>
                        <div className="HeaderItem">
                            <button onClick={openSettingModal} className="HeaderSettingsButton">설정</button>
                            <SettingsModal isOpen={settingModalOpen} onClose={closeSettingModal} />
                        </div>
                    </>
                ) : (
                    <div className="HeaderItem">
                        <button onClick={openLoginModal} className="HeaderLoginButton">시작하기</button>
                        <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
