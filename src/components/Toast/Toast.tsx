import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer, CloseButton} from "./style"

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const  Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => {
        clearTimeout(timer);
      };
    }, [onClose]);
  
    return ReactDOM.createPortal(
      <ToastContainer type={type} show>
        {message}
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ToastContainer>,
      document.getElementById('toast-root') as HTMLElement
    );
  };