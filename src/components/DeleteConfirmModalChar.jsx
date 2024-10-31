import React from "react";
import "../styles/DeleteConfirmationModal.css";
import { ReactComponent as TrashIcon } from "../img/Trash.svg";

const DeleteConfirmModalChar = ({
  isOpen,
  onClose,
  onConfirm,
  characterName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay1">
      <div className="modalContent2">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <div className="h1">{`${characterName}`}을(를) 삭제하시겠어요?</div>
        <div className="h3" style={{ marginBottom: "30px" }}>
          이 작업은 되돌릴 수 없습니다.
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

export default DeleteConfirmModalChar;
