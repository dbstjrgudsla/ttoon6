import React, { useState, useEffect } from "react";
import "../styles/AddProfileImage.css";

const AddProfileImage = ({ imageUrl, onImageChange }) => {
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    setProfileImage(imageUrl);
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];

    // 파일이 존재하지 않으면 종료
    if (!file) return;

    // 파일 형식 및 크기 제한
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG are allowed.");
      return;
    }

    // 파일 크기 제한 (예: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds the 5MB limit.");
      return;
    }

    setError(null); // 오류가 없을 때는 에러 초기화
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
      if (onImageChange) {
        onImageChange(file); // Call the callback with the new file
      }
    };

    reader.onerror = () => {
      setError("Failed to load the image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-photo-container">
      <div className="profile-photo">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="placeholder"></div>
        )}
        <label htmlFor="file-upload" className="upload-button">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <span className="plus-icon">+</span>
        </label>
      </div>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* 에러 메시지 출력 */}
    </div>
  );
};

export default AddProfileImage;
