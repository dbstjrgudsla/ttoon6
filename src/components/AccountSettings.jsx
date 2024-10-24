// AccountSettings.jsx
import React, { useState, useEffect } from "react";
import apiClient from "./apiClient"; // API 클라이언트 임포트
import "../styles/AccountSettings.css"; // 스타일 시트 임포트
import AddProfileImage from "./AddProfileImage"; // 프로필 이미지 추가 컴포넌트
import NicknameInput from "./NickNameInput"; // 닉네임 입력 컴포넌트
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

const AccountSettings = ({ onUpdateProfileData }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const [profileData, setProfileData] = useState({
    nickName: "",
    email: "",
    imageUrl: null,
    point: 0,
    provider: "",
  });

  const [newNickName, setNewNickName] = useState(""); // 새로운 닉네임 상태
  const [newProfileImage, setNewProfileImage] = useState(null); // 새로운 프로필 이미지 상태

  useEffect(() => {
    fetchProfileData(); // 컴포넌트가 마운트될 때 프로필 데이터 가져오기
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      navigate("/login"); // 액세스 토큰이 없으면 로그인 페이지로 이동
      return;
    }

    try {
      const response = await apiClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.isSuccess) {
        setProfileData(response.data.data);
        setNewNickName(response.data.data.nickName);
        onUpdateProfileData({
          nickName: response.data.data.nickName,
          point: response.data.data.point,
          imageUrl: response.data.data.imageUrl, // 프로필 이미지 전달
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    // 닉네임이 변경되었는지 확인
    const nickNameValue =
      newNickName !== profileData.nickName ? newNickName : profileData.nickName;

    // 프로필 사진 변경 여부 확인
    let fileValue = newProfileImage;

    // 이미지가 변경되지 않았을 경우 기존의 이미지 URL 사용
    if (!newProfileImage && profileData.imageUrl) {
      fileValue = profileData.imageUrl; // 기존 이미지 URL 사용
    }

    try {
      // 닉네임과 isDelete 값을 쿼리 스트링에 추가
      const params = new URLSearchParams();
      params.append("nickName", nickNameValue);
      params.append("isDelete", false); // 이미지 삭제를 지원하지 않는다고 가정 (항상 false)

      // FormData 생성
      const formData = new FormData();
      if (fileValue) {
        if (typeof fileValue === "string") {
          // 기존 이미지 URL이 있을 경우 URL을 전송
          formData.append("fileUrl", fileValue); // 기존 이미지 URL 전송
        } else {
          // 새 이미지를 업로드할 경우 파일 전송
          formData.append("file", fileValue);
        }
      } else {
        console.error("프로필 이미지가 설정되지 않았습니다.");
        return;
      }

      console.log("Sending PATCH request to /profile with token:", token);
      console.log("FormData (file):", fileValue);
      console.log("Query Params:", params.toString());

      // FormData로 PATCH 요청 보내기
      const response = await apiClient.patch(
        `/profile?${params.toString()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile Update Response:", response.data);

      if (response.data.isSuccess) {
        console.log("Profile updated successfully");
        fetchProfileData(); // 프로필 데이터를 다시 가져옴
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
            onImageChange={(image) => setNewProfileImage(image)} // 이미지 변경 처리
          />
        </div>
        <div className="NickName">
          닉네임
          <NicknameInput
            initialNickname={profileData.nickName}
            onNicknameChange={(nickname) => setNewNickName(nickname)} // 닉네임 변경 처리
            onSave={handleUpdateProfile} // "저장" 버튼 클릭 시 handleUpdateProfile 호출
          />
        </div>
      </div>
      <div className="Line" style={{ marginTop: "10px" }}></div>
      <div className="AccountProfileInfo">
        <div style={{ fontWeight: "600", fontSize: "18px" }}>계정 정보</div>
        <div className="AccountProfileInfoItem">
          <div className="UserEmail">이메일 {profileData.email}</div>
          <div
            className="SignOut"
            onClick={() => {
              // 탈퇴하기 기능 구현 필요
              console.log("탈퇴하기 클릭됨");
            }}
          >
            탈퇴하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
