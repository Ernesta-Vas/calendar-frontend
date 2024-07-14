import { motion } from 'framer-motion';
import styled from 'styled-components';
import { RxCross2 } from 'react-icons/rx';

export const ModalContainer = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

export const ModalContent = styled.div`
  border-radius: 5px;
  background: #fff;
  min-width: 900px;
  max-height: 500px;
  overflow: auto;
  padding: 15px 0;
  position: relative;

  @media (max-width: 1024px) {
    min-width: 500px;
  }

  @media (max-width: 768px) {
    min-width: 90%;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  border: none;
  cursor: pointer;
  font-size: 28px;
  background: none;
  color: #262626;
`;

export const BigCloseButton = styled(RxCross2)`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 50px;
  color: white;
  cursor: pointer;
  z-index: 9999;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;
