import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1); /* Прозрачный фон */
  border-bottom: 1px solid #ccc;
  backdrop-filter: blur(10px);
  position: fixed; /* Фиксируем шапку наверху */
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const DateSelectorsWrapper = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileSelectorsButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    background: transparent;
    border: 1px solid #2c3e50;
    color: #2c3e50;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #2c3e50;
      color: #fff;
    }
  }
`;

export const MobileSelectorsContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 58px;
    width: 100%;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1); /* Прозрачный фон */
    border-bottom: 1px solid #ccc;
    backdrop-filter: blur(10px);
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const UserIcon = styled(FaUserCircle)`
  color: #2c3e50;
  font-size: 24px;
`;

export const Username = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
`;

export const Separator = styled.div`
  height: 30px;
  width: 1px;
  background-color: #2c3e50;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #2c3e50;
  color: #2c3e50;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2c3e50;
    color: #fff;
  }
`;