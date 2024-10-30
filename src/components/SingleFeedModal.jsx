import React, { useState } from "react";
import "../styles/SingleFeedModal.css"; // 모달 스타일 추가
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const SingleFeedModal = ({ feed, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < feed.imageUrl.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : feed.imageUrl.length - 1
    );
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <div className="imageContainer">
          <button className="prevButton" onClick={handlePrevImage}>
            <GrFormPrevious />
          </button>
          <img
            src={feed.imageUrl[currentImageIndex]}
            alt={`피드 이미지 ${currentImageIndex + 1}`}
            className="feedImage"
          />
          <button className="nextButton" onClick={handleNextImage}>
            <GrFormNext />
          </button>
        </div>
        <div className="feedDetails">
          <h2 className="feedTitle">{feed.title}</h2>
          <p className="feedContent">{feed.content}</p>
          <p className="feedDate">{feed.createdDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleFeedModal;
