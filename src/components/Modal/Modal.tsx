import { FC, useEffect, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';

import {ModalContainer, ModalCloseButton, ModalContent, ModalWrapper, BigCloseButton} from "./style"

interface ModalType {
  closeModal: () => void;
  template?: ReactElement | null;
  show: boolean;
}

const animationStyles = {
  open: {
    background: "rgba(0, 0, 0, 0.6)",
    opacity: 1,
  },
  close: {
    background: "rgba(0, 0, 0, 0)",
    opacity: 0,
  },
};

const transition = {
  type: 'tween',
  ease: [0.45, 0, 0.55, 1],
  duration: 0.25,
};

export const Modal: FC<ModalType> = ({ closeModal, template, show }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const effect = {
    initial: show ? 'close' : 'open',
    animate: 'open',
    exit: 'close',
    variants: animationStyles,
    transition: transition,
  };

  return createPortal(
    <ModalContainer {...effect}>
      <ModalWrapper>
        <ModalContent {...effect}>
          <ModalCloseButton onClick={closeModal}>
            <RxCross2 />
          </ModalCloseButton>
          {template}
        </ModalContent>
      </ModalWrapper>
      <BigCloseButton onClick={closeModal}>
        <RxCross2 />
      </BigCloseButton>
    </ModalContainer>,
    document.getElementById('modal') as HTMLElement
  );
};