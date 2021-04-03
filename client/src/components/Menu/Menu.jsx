import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import { Text } from '../../styled';
import { BoxMenu, MenuIcon } from './styled';
import { userAuthApi } from '../../api/api';

const Menu = () => {
  const id = localStorage.getItem('id');

  const logout = () => {
    userAuthApi
      .logout()
      .catch((err) => console.error("ERROR logout:", err))
      .finally(() => {
          localStorage.clear();
      });
  }

  return (
    <BoxMenu>
      <MenuIcon to={`/profile/${id}`} exact activeClassName="active">
        <PersonIcon style={{ width: 50, height: 50 }} />
        <Text size="15px">Профиль</Text>
      </MenuIcon>

      <MenuIcon to="/chats" activeClassName="active">
        <ChatBubbleIcon style={{ width: 40, height: 40 }} />
        <Text size="15px">Чаты</Text>
      </MenuIcon>

      <MenuIcon to="/search" activeClassName="active">
        <LocationSearchingIcon style={{ width: 45, height: 45 }} />
        <Text size="15px">Поиск пары</Text>
      </MenuIcon>

      <MenuIcon to="/pairs" activeClassName="active">
        <SupervisorAccountIcon style={{ width: 50, height: 50 }} />
        <Text size="15px">Пары</Text>
      </MenuIcon>

      <MenuIcon to="/settings" activeClassName="active">
        <SettingsIcon style={{ width: 45, height: 45 }} />
        <Text size="15px">Настройки</Text>
      </MenuIcon>

      <MenuIcon to="/login" onClick={logout} activeClassName="active">
        <ExitToAppIcon style={{ width: 45, height: 45 }} />
        <Text size="15px">Выход</Text>
      </MenuIcon>
    </BoxMenu>
  );
}

export default Menu;
