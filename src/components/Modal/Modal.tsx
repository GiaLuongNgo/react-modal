import React from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footerButtons: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footerButtons }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__container">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>

        <div className="modal__body" data-testid="modal-body">
          {children}
        </div>

        <div className="modal__footer" data-testid="modal-footer">
          {footerButtons}
        </div>
      </div>
    </div>
  );
};

export default Modal; 