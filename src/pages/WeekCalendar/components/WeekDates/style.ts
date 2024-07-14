import styled from 'styled-components';

interface DayNumberProps {
  isHoliday: boolean;
}

export const TodosContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 15px;
  overflow-y: auto;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;

  &:hover {
   opacity: 0.8;
  }
`;


export const EditButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export const TodoItem = styled.div`
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

   &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

    ${DeleteButton} {
      color: #2c3e50;
    }

    ${EditButton} {
      color: #2c3e50;
    }
  }
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 1200px) {
    justify-content: space-around;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const DayBlock =  styled.div<DayNumberProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 300px;
  background: #fff0f6;
  border: 2px solid #ff69b4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: ${({ isHoliday }) => (isHoliday ? 'lightyellow' : 'white')};
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff69b4, #ff1493);
    color: #fff;
    border-color: #ff1493;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

    ${TodosContainer} {
      ${TodoItem} {
        background: #fff;
        color: #ff69b4;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 300px; 
    margin-bottom: 20px;
  }
`;

export const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #ff69b4;
  color: #fff;
  padding: 10px;
  border-bottom: 2px solid #ff1493;
`;

export const DayName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

export const DayNumber = styled.div<DayNumberProps>`
  font-weight: bold;
  font-size: ${({ isHoliday }) => (isHoliday ? '20px' : '16px')};
  color: ${({ isHoliday }) => (isHoliday ? 'red' : 'white')};
`;

export const TodoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const TodoContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & div {
   word-wrap: break-word; 
  word-break: break-word;
  white-space: pre-wrap;
  }
`;

export const TodoDescription = styled.div`
  font-size: 14px;
  color: #f8bbd0;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;

  ${DayBlock}:hover & {
    opacity: 1;
  }
`;