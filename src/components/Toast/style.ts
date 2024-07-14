import styled, { css, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const ToastContainer = styled.div<{ type: 'success' | 'error'; show: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  background-color: ${({ type }) => (type === 'success' ? '#28a745' : '#dc3545')};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateX(100%);
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.5s forwards;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;

  ${({ type }) => type === 'success' && css`
    background-color: #ff69b4;
  `}

  ${({ type }) => type === 'error' && css`
    background-color: #dc3545;
  `}
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #000;
  }
`;