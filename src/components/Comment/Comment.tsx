import React, { useState } from 'react';
import { EditIcon, DeleteIcon, ShareIcon, CloseIcon, CheckIcon } from '../Icons';
import './Comment.scss';

interface CommentProps {
  id: number;
  image: string;
  imageUrl: string;
  filename?: string;
  type: string;
  comment: string;
  selected?: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, newComment: string) => void;
  onToggleSelect: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  image,
  imageUrl,
  filename,
  type,
  comment,
  selected,
  onDelete,
  onEdit,
  onToggleSelect
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editedComment);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedComment(comment);
    setIsEditing(false);
  };

  return (
    <div className="comment">
      <input
        type="checkbox"
        className="comment__checkbox"
        checked={selected}
        onChange={() => onToggleSelect(id)}
      />
      <img src={imageUrl} alt={filename || image} className="comment__image" />

      <div className="comment__content">
        <div className="comment__filename">{filename || image}</div>
        <div className="comment__type-container">
          <div className="comment__type">{type}</div>
          {isEditing ? (
            <textarea
              className="comment__text-input"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              autoFocus
            />
          ) : (
            <div className="comment__text">{comment}</div>
          )}
        </div>
      </div>

      <div className="comment__actions">
        <button
          className="comment__action-button"
          onClick={isEditing ? handleCancel : handleEdit}
          aria-label={isEditing ? "Cancel" : "Edit"}
        >
          {isEditing ? <CloseIcon /> : <EditIcon />}
        </button>
        {isEditing ? (
          <button
            className="comment__action-button"
            onClick={handleEdit}
            aria-label="Save"
          >
            <CheckIcon />
          </button>
        ) : (
          <>
            <button
              className="comment__action-button"
              onClick={() => onDelete(id)}
              aria-label="Delete"
            >
              <DeleteIcon />
            </button>
            <button className="comment__action-button" aria-label="Share">
              <ShareIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment; 