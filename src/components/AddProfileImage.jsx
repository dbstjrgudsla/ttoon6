// ProfilePhotoUpload.js
import React, { useState } from 'react';
import '../styles/AddProfileImage.css';

const AddProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
            style={{ display: 'none' }}
          />
          <span className="plus-icon">+</span>
        </label>
      </div>
    </div>
  );
};

export default AddProfileImage;
