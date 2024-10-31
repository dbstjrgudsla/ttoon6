// CharacterListModal Component
import React, { useState } from "react";
import CharPlusModal from "./CharPlusModal";
import CharModifyModal from "./CharModifyModal";
import DeleteConfirmModalChar from "./DeleteConfirmModalChar";
import "../styles/CharacterListModal.css";

const CharacterListModal = ({
  characters,
  onClose,
  onAddCharacter,
  onDeleteCharacter,
  onEditCharacter,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [characterToModify, setCharacterToModify] = useState(null);
  const [characterToDelete, setCharacterToDelete] = useState(null);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const openModifyModal = (char) => {
    setCharacterToModify(char);
    setIsModifyModalOpen(true);
  };

  const closeModifyModal = () => {
    setIsModifyModalOpen(false);
    setCharacterToModify(null);
  };

  const openDeleteModal = (char) => {
    setCharacterToDelete(char);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCharacterToDelete(null);
  };

  const handleDeleteCharacterConfirm = () => {
    if (characterToDelete) {
      onDeleteCharacter(characterToDelete.id);
      closeDeleteModal();
    }
  };

  const handleConfirmModify = (updatedChar) => {
    onEditCharacter(updatedChar);
    closeModifyModal();
  };

  return (
    <div className="modal-overlay22" onClick={onClose}>
      <div className="modal-content22" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close22" onClick={onClose}>
          X
        </button>
        <h2>등장인물 목록</h2>
        <div className="character-list">
          {characters.map((char) => (
            <div key={char.id} className="character-item">
              <div className="character-info">
                <div className="character-name">{char.name}</div>
                <div className="character-description">{char.description}</div>
              </div>
              <button
                className="menu-button"
                onClick={() => toggleMenu(char.id)}
              >
                ⋮
              </button>
              {activeMenu === char.id && (
                <div
                  key={`menu-dropdown-${char.id}`}
                  className="menu-dropdown fixed-dropdown"
                >
                  <button
                    key={`delete-${char.id}`}
                    className="menu-item delete"
                    onClick={() => {
                      openDeleteModal(char);
                      setActiveMenu(null);
                    }}
                  >
                    인물 삭제하기
                  </button>
                  <button
                    key={`edit-${char.id}`}
                    className="menu-item edit"
                    onClick={() => {
                      openModifyModal(char);
                      setActiveMenu(null);
                    }}
                  >
                    인물 수정하기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="add-character-button" onClick={handleOpenAddModal}>
          새로운 인물 추가하기
        </button>

        {isAddModalOpen && (
          <CharPlusModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddModal}
            onAddCharacter={onAddCharacter}
          />
        )}

        {isModifyModalOpen && characterToModify && (
          <CharModifyModal
            isOpen={isModifyModalOpen}
            onClose={closeModifyModal}
            character={characterToModify}
            onConfirm={handleConfirmModify}
          />
        )}

        {isDeleteModalOpen && characterToDelete && (
          <DeleteConfirmModalChar
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteCharacterConfirm}
            characterName={characterToDelete.name}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterListModal;
