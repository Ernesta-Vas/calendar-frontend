import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../api/authService';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { DateSelectors } from '../WeekDateSelector/Selects/DateSelectors';

import {
  HeaderContainer, 
  Username, 
  LogoutButton, 
  DateSelectorsWrapper, 
  UserActions, 
  UserIcon, 
  UserWrapper, 
  Separator, 
  MobileSelectorsButton,
  MobileSelectorsContainer} from "./style"

export const Header: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSelectors, setShowSelectors] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('./calendar-frontend/login');
  };

  const toggleSelectors = () => {
    setShowSelectors(!showSelectors);
  };

  return (
    <>
      <HeaderContainer>
        <DateSelectorsWrapper>
          <DateSelectors />
        </DateSelectorsWrapper>
        <MobileSelectorsButton onClick={toggleSelectors}>
          Выбор даты
        </MobileSelectorsButton>
        <UserActions>
          <UserWrapper>
            <UserIcon />
            <Username>{state.user?.username}</Username>
          </UserWrapper>
          <Separator />
          <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
        </UserActions>
      </HeaderContainer>
      {showSelectors && (
        <MobileSelectorsContainer>
          <DateSelectors />
        </MobileSelectorsContainer>
      )}
    </>
  );
};