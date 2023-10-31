// src/components/Modal.js
import React from 'react';
import "./Modal.css"
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return (<></>);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="bg-white rounded shadow-lg p-4">
          <div className="modal-close" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-700 m-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
