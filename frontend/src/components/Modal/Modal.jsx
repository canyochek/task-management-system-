import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal(); 
    } else {
      dialog.close(); 
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return createPortal(
    <dialog 
      ref={dialogRef} 
      onClose={onClose} 
      onClick={handleOverlayClick}
      className="modern-modal"
    >
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;