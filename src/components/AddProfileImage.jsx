import React, { useState, useEffect } from "react";
import "../styles/AddProfileImage.css";

const AddProfileImage = ({ imageUrl, onImageChange }) => {
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProfileImage(imageUrl);
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
      if (onImageChange) {
        onImageChange(file);
      }
    };

    reader.onerror = () => {
      setError("이미지를 불러오는데 실패했습니다. 다시 시도해주세요.");
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
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddProfileImage;
