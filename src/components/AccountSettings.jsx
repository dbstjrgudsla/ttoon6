// AccountSettings.js
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.log("Fetched Profile Data:", response.data);
      if (response.data.isSuccess) {
        setProfileData(response.data.data);
        setNewNickName(response.data.data.nickName); // 닉네임 상태 업데이트
        onUpdateProfileData(response.data.data); // 부모 컴포넌트로 프로필 데이터 전달
      } else {
        console.error("Error fetching profile data:", response.data.message);
        navigate("/login"); // 인증 실패 시 로그인 페이지로 이동
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      navigate("/login"); // 에러 발생 시 로그인 페이지로 이동
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return; // 오류만 로그로 남김
    }

    // 닉네임이 변경되었는지 확인
    const nickNameValue =
      newNickName !== profileData.nickName ? newNickName : null;

    // 프로필 사진 삭제 여부 확인
    let isDelete = false;
    let fileValue = null;

    if (newProfileImage === null && profileData.imageUrl) {
      // 프로필 사진을 삭제하려는 경우
      isDelete = true;
    } else if (newProfileImage) {
      // 새로운 프로필 사진을 업로드하려는 경우
      fileValue = newProfileImage;
    }

    // FormData 생성
    const formData = new FormData();

    // 쿼리 스트링에 닉네임 추가 (null인 경우 생략)
    const params = new URLSearchParams();
    if (nickNameValue !== null) {
      params.append("nickName", nickNameValue);
    }

    // isDelete는 필수 입력값
    formData.append("isDelete", isDelete);

    // 파일 추가 (삭제가 아니고, 새로운 파일이 있는 경우)
    if (fileValue) {
      formData.append("file", fileValue);
    } else {
      // 파일을 보내지 않거나 삭제하는 경우에는 null을 보냅니다.
      formData.append("file", null);
    }

    try {
      console.log("Sending PATCH request to /profile with token:", token);
      console.log("FormData:", {
        nickName: nickNameValue,
        isDelete: isDelete,
        file: fileValue,
      });

      const response = await apiClient.patch(
        `/profile?${params.toString()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
