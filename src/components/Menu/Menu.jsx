import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';

import Text from '../Text/Text';
import { BoxMenu, MenuIcon } from './styled';

const Menu = () => (
  <BoxMenu>
    <MenuIcon to="/" exact activeClassName="active">
      <PersonIcon style={{ width: 60, height: 60 }} />
      <Text>Профиль</Text>
    </MenuIcon>

    <MenuIcon to="/chats" activeClassName="active">
      <ChatBubbleIcon style={{ width: 45, height: 45 }} />
      <Text>Чаты</Text>
    </MenuIcon>

    <MenuIcon to="/search" activeClassName="active">
      <LocationSearchingIcon style={{ width: 50, height: 50 }} />
      <Text>Поиск пары</Text>
    </MenuIcon>

    <MenuIcon to="/pairs" activeClassName="active">
      <SupervisorAccountIcon style={{ width: 60, height: 60 }} />
      <Text>Пары</Text>
    </MenuIcon>

    <MenuIcon to="/settings" activeClassName="active">
      <SettingsIcon style={{ width: 55, height: 55 }} />
      <Text>Настройки</Text>
    </MenuIcon>
  </BoxMenu>
);

export default Menu;
