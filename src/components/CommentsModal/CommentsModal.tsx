import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Comment from '../Comment/Comment';
import { Comment as CommentType } from '../../types';
import { initialComments } from '../../constants/comments';
import './CommentsModal.scss';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState<CommentType[]>(
    initialComments.map(comment => ({ ...comment, selected: false }))
  );

  const [allUsers, setAllUsers] = useState<boolean>(false);

  const handleDelete = (id: number): void => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleEdit = (id: number, newComment: string): void => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, comment: newComment } : comment
    ));
  };

  const handleDeleteAll = (): void => {
    setComments([]);
  };

  const handleToggleSelect = (id: number): void => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, selected: !comment.selected } : comment
    ));
  };

  const handleSelectAll = (checked: boolean): void => {
    setComments(comments.map(comment => ({ ...comment, selected: checked })));
    setAllUsers(checked);
  };

  const handleSendAll = () => {
    const selectedComments = comments.filter(comment => comment.selected);
    if (selectedComments.length === 0) {
      alert('Please select at least one comment to send');
      return;
    }
    const commentsToSend = selectedComments.map(({ selected, ...comment }) => comment);
    console.log('Sent selected comments:', commentsToSend);
    onClose();
  };

  const footerButtons = (
    <>
      <div className="footer">
        <button className="footer__button footer__button--secondary" onClick={handleDeleteAll}>
          Delete all
        </button>
        <div className="footer__actions">
          <button className="footer__button footer__button--secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            onClick={handleSendAll}
            className="footer__button footer__button--primary"
          >
            Send all
          </button>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Comments"
      footerButtons={footerButtons}
    >
      <div className="comments">
        <div className="comments__header">
          <div className="comments__title">
            Saved Comments <span className="comments__count">{comments.length}</span>
          </div>
          <div className="comments__toggle">
            <span>All Users</span>
            <label className="comments__switch">
              <input
                type="checkbox"
                checked={allUsers}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span className="comments__slider"></span>
            </label>
          </div>
        </div>

        <div className="comments__list">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CommentsModal; 