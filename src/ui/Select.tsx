import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 250px;

  @media (max-width: 1200px) {
    width: 200px;
  }

  @media (max-width: 1024px) {
    width: 150px;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  color: #2c3e50;
`;

const SelectBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 16px;
  color: #2c3e50;
  background-color: #fff;
  border: 2px solid #ff69b4;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus,
  &:hover {
    border-color: #ff1493;
    box-shadow: 0 4px 8px rgba(255, 105, 180, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #ff69b4;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background: #fff;
  border: 2px solid #ff69b4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 105, 180, 0.3);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ff69b4 #f1f1f1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff69b4;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const Option = styled.div<{ isSelected: boolean }>`
  padding: 12px;
  font-size: 16px;
  color: ${props => (props.isSelected ? '#fff' : '#2c3e50')};
  background-color: ${props => (props.isSelected ? '#ff69b4' : 'transparent')};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff69b4;
    color: #fff;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const CloseButton = styled.span`
  position: sticky;
  left: 100%;
  top: 0;
  cursor: pointer;
  font-size: 20px;
  color: #2c3e50;
  padding: 5px;
  &:hover {
    color: #ff1493;
  }
`;

interface SelectProps<T> {
  label: string;
  selectedValue: T;
  options: T[];
  onChange: (value: T) => void;
  displayValue: (value: T) => string;
}

export const Select = <T,>({
  label,
  selectedValue,
  options,
  onChange,
  displayValue,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (value: T) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isOpen]);

  return (
    <SelectWrapper>
      <Label>{label}</Label>
      <SelectBox onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
        {displayValue(selectedValue)}
      </SelectBox>
      {isOpen && (
        <Dropdown>
          <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton>
          {options.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleSelect(option)}
              ref={selectedValue === option ? selectedOptionRef : null}
              isSelected={selectedValue === option}
            >
              {displayValue(option)}
            </Option>
          ))}
        </Dropdown>
      )}
    </SelectWrapper>
  );
};