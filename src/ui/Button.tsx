import React from 'react';
import styled from 'styled-components';

type ButtonColor = 'base' | 'error' | 'success';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: ButtonColor;
  backgroundColor?: ButtonColor;
  disabled?: boolean;
  onClick?: () => void;
  position?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const getColor = (color: ButtonColor | undefined) => {
  switch (color) {
    case 'error':
      return '#dc3545';
    case 'success':
      return '#28a745';
    case 'base':
    default:
      return '#595959'; // Светло-серый цвет текста
  }
};

const getBackgroundColor = (backgroundColor: ButtonColor | undefined) => {
  switch (backgroundColor) {
    case 'error':
      return '#dc3545';
    case 'success':
      return '#28a745';
    case 'base':
    default:
      return '#fddde6';
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ size }) =>
    size === 'small' ? '8px 20px' :
    size === 'medium' ? '14px 28px' : '18px 36px'};
  font-size: ${({ size }) =>
    size === 'small' ? '16px' :
    size === 'medium' ? '18px' : '20px'};
  color: ${({ color }) => getColor(color)};
  background-color: ${({ backgroundColor }) => getBackgroundColor(backgroundColor)};
  border: 2px solid ${({ backgroundColor }) => getBackgroundColor(backgroundColor)};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  min-width: ${({ size }) =>
    size === 'small' ? '150px' :
    size === 'medium' ? '200px' : '250px'}; // Установка разумной ширины кнопки

  &:hover {
    background-color: #2c3e50;
    border-color: #2c3e50;
    color: #fff;
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
  }

  & + & {
    margin-top: 15px;
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
