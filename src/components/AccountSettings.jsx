// AccountSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/AccountSettings.css";
import AddProfileImage from './AddProfileImage';
import NickNameInput from './NickNameInput';

const AccountSettings = () => {
  const [profileData, setProfileData] = useState({
    nickName: '',
    email: '',
    imageUrl: null,
    point: 0,
    provider: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://ttoon.site/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data.isSuccess) {
            setProfileData(response.data.data);
            console.log(response.data);
          } else {
            console.error('Error fetching profile data:', response.data.message);
          }
        } else {
          console.log("로그인 토큰이 없습니다. 로그인이 필요합니다.");
          // 필요에 따라 로그인 페이지로 이동하거나 다른 처리를 수행합니다.
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className='AccountWrapper'>
      <div style={{ fontWeight: '700', fontSize: '20px' }}>계정 설정</div>
      <div className="ProfileSetting">
        프로필 설정
        <div><AddProfileImage /></div>
        <div className='NickName'>
         닉네임 <NickNameInput initialNickname={profileData.nickName} />
        </div>
      </div>
      <div className="AccountProfileInfo">
        <div style={{ fontWeight: '600', fontSize: '18px' }}>계정 정보</div>
        <div className='AccountProfileInfoItem'>
          <div className='UserEmail'>이메일 {profileData.email}</div>
          <div className='SignOut'>탈퇴하기</div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
