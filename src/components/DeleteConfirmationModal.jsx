import React from "react";
import "../styles/DeleteConfirmationModal.css";
import { ReactComponent as TrashIcon } from "../img/Trash.svg"; // Trash 아이콘

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, date }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay1">
      <div className="modalContent2">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <div className="h1">
          {`${date}`}의 기록을
          <br /> 삭제하시겠어요?
        </div>
        <div className="h3" style={{ marginBottom: "30px" }}>
          기록을 삭제하면, 나중에 내용과
          <br />
          네컷 만화 모두 다시 복구할 수 없어요
        </div>
        <TrashIcon className="trashIcon" />
        <div className="buttonContainer">
          <button className="cancelButton" onClick={onClose}>
            돌아가기
          </button>
          <button className="confirmButton" onClick={onConfirm}>
            삭제할래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
