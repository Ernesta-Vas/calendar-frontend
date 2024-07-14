import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type InputColor = 'base' | 'error' | 'success';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'small' | 'medium' | 'large';
  color?: InputColor;
  position?: 'left' | 'center' | 'right';
  onClear?: () => void;
}

const getColor = (color: InputColor | undefined) => {
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<InputProps>`
  padding: ${({ inputSize }) =>
    inputSize === 'small' ? '10px 40px 10px 20px' :
    inputSize === 'medium' ? '14px 40px 14px 20px' : '18px 40px 18px 20px'};
  font-size: ${({ inputSize }) =>
    inputSize === 'small' ? '16px' :
    inputSize === 'medium' ? '18px' : '20px'};
  color: ${({ color }) => getColor(color)};
  background: ${({ disabled }) => (disabled ? '#ccc' : '#fff')};
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: ${({ position }) =>
    position === 'left' ? 'left' :
    position === 'center' ? 'center' : 'right'};
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;

  &:focus {
    border-color: #2c3e50;
    box-shadow: 0 0 5px rgba(44, 62, 80, 0.2);
    outline: none;
  }

  &:hover {
    border-color: #2c3e50;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ClearIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 15px;
  color: #ccc;
  &:hover {
    color: #000;
  }
`;

const TogglePasswordIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #ccc;
  &:hover {
    color: #000;
  }
`;

export const Input: React.FC<InputProps> = ({ onClear, type, value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue || '');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleClear = () => {
    setValue('');
    if (onClear) {
      onClear();
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputWrapper>
      <StyledInput
        {...props}
        type={showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
      />
      {value && <ClearIcon onClick={handleClear}>&#x2715;</ClearIcon>}
      {value && type === 'password' && (
        <TogglePasswordIcon onMouseDown={handleTogglePassword} onMouseUp={handleTogglePassword}>
          &#x1F441;
        </TogglePasswordIcon>
      )}
    </InputWrapper>
  );
};