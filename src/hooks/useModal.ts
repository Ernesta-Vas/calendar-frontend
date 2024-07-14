import { ReactElement, useState } from 'react';

interface State {
  isOpen: boolean;
  template: JSX.Element | null;
  modalType: 'create' | 'update';
}

interface ModalHook {
  modalState: State;
  openModal: (template: ReactElement, modalType: 'create' | 'update') => void;
  closeModal: () => void;
}

export const useModal = (): ModalHook => {
  const [modalState, setModalState] = useState<State>({
    isOpen: false,
    template: null,
    modalType: 'create',
  });

  const openModal = (template: ReactElement, modalType: 'create' | 'update') => {
    setModalState({ isOpen: true, template, modalType });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, template: null, modalType: 'create' });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};