import React, { useState, useEffect } from "react";
import apiClient from "./apiClient";
import "../styles/AccountSettings.css";
import AddProfileImage from "./AddProfileImage";
import NicknameInput from "./NickNameInput";

const AccountSettings = () => {
  const [profileData, setProfileData] = useState({
    nickName: "",
    email: "",
    imageUrl: null,
    point: 0,
    provider: "",
  });

  const [newNickName, setNewNickName] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await apiClient.get("/profile");
      console.log("Fetched Profile Data:", response.data);
      if (response.data.isSuccess) {
        setProfileData(response.data.data);
        setNewNickName(response.data.data.nickName);
      } else {
        console.error("Error fetching profile data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    const formData = new FormData();
    formData.append("nickName", newNickName);
    if (newProfileImage) {
      formData.append("file", newProfileImage);
    }

    try {
      console.log("Sending PATCH request to /profile with token:", token);

      const response = await apiClient.patch("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile Update Response:", response.data);

      if (response.data.isSuccess) {
        console.log("Profile updated successfully");
        fetchProfileData(); // 프로필 데이터를 다시 가져오기
      } else {
        console.error("Error updating profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="AccountWrapper">
      <div style={{ fontWeight: "700", fontSize: "20px" }}>계정 설정</div>
      <div className="ProfileSetting">
        프로필 설정
        <div>
          <AddProfileImage
            imageUrl={profileData.imageUrl}
            onImageChange={(image) => setNewProfileImage(image)}
          />
        </div>
        <div className="NickName">
          닉네임
          <NicknameInput
            initialNickname={profileData.nickName}
            onNicknameChange={(nickname) => setNewNickName(nickname)}
          />
        </div>
      </div>
      <div className="Line" style={{ marginTop: "10px" }}></div>
      <div className="AccountProfileInfo">
        <div style={{ fontWeight: "600", fontSize: "18px" }}>계정 정보</div>
        <div className="AccountProfileInfoItem">
          <div className="UserEmail">이메일 {profileData.email}</div>
          <div className="SignOut" onClick={() => {}}>
            탈퇴하기
          </div>
        </div>
      </div>
      <button className="Apply" onClick={handleUpdateProfile}>
        수정
      </button>
    </div>
  );
};

export default AccountSettings;
