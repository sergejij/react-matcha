import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { Text } from '../../styled';
import {
    BoxMenu,
    BurgerStyled,
    MenuIconLink,
    MobileMenuClose,
    MobileMenuItems,
    MobileMenuLink,
    MobileMenuStyled
} from './styled';
import { userAuthApi } from '../../api/api';
import ReactDOM from "react-dom";

const MobileMenu = ({ onClose, onLogout, id }) => {
    return (
        <MobileMenuStyled>
            <MobileMenuClose>
                <CloseIcon onClick={onClose} fontSize="large" color="error" />
            </MobileMenuClose>
            <MobileMenuItems>
                <MobileMenuLink onClick={onClose} to={`/profile/${id}`} exact activeClassName="active">
                    <Text size="20px">Профиль</Text>
                </MobileMenuLink>

                <MobileMenuLink onClick={onClose} to="/chats" activeClassName="active">
                    <Text size="20px">Чаты</Text>
                </MobileMenuLink>

                <MobileMenuLink onClick={onClose} to="/search" activeClassName="active">
                    <Text size="20px">Поиск пары</Text>
                </MobileMenuLink>

                <MobileMenuLink onClick={onClose} to="/pairs" activeClassName="active">
                    <Text size="20px">Пары</Text>
                </MobileMenuLink>

                <MobileMenuLink onClick={onClose} to="/settings" activeClassName="active">
                    <Text size="20px">Настройки</Text>
                </MobileMenuLink>

                <MobileMenuLink onClick={onClose} to="/login" onClick={onLogout} activeClassName="active">
                    <Text size="20px">Выход</Text>
                </MobileMenuLink>
            </MobileMenuItems>
        </MobileMenuStyled>
    )
}

const Burger = ({  onLogout, id }) => {
    const [isOpenedMenu, setIsOpenedMenu] = React.useState(false);
    const portalRoot = document.getElementById('portal');

    return isOpenedMenu ? (
        ReactDOM.createPortal(
            <MobileMenu onLogout={onLogout} id={id} onClose={() => setIsOpenedMenu(false)} />,
            portalRoot,
        )
    ) : (
        <BurgerStyled onClick={() => setIsOpenedMenu(prev => !prev)}>
            <MenuIcon />
        </BurgerStyled>
    )
}

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

  return window.innerWidth > 700 ? (
    <BoxMenu>
      <MenuIconLink to={`/profile/${id}`} exact activeClassName="active">
        <PersonIcon style={{ width: 50, height: 50 }} />
        <Text size="15px">Профиль</Text>
      </MenuIconLink>

      <MenuIconLink to="/chats" activeClassName="active">
        <ChatBubbleIcon style={{ width: 40, height: 40 }} />
        <Text size="15px">Чаты</Text>
      </MenuIconLink>

      <MenuIconLink to="/search" activeClassName="active">
        <LocationSearchingIcon style={{ width: 45, height: 45 }} />
        <Text size="15px">Поиск пары</Text>
      </MenuIconLink>

      <MenuIconLink to="/pairs" activeClassName="active">
        <SupervisorAccountIcon style={{ width: 50, height: 50 }} />
        <Text size="15px">Пары</Text>
      </MenuIconLink>

      <MenuIconLink to="/settings" activeClassName="active">
        <SettingsIcon style={{ width: 45, height: 45 }} />
        <Text size="15px">Настройки</Text>
      </MenuIconLink>

      <MenuIconLink to="/login" onClick={logout} activeClassName="active">
        <ExitToAppIcon style={{ width: 45, height: 45 }} />
        <Text size="15px">Выход</Text>
      </MenuIconLink>
    </BoxMenu>
  ) : <Burger onLogout={logout} id={id} />;
}

export default Menu;
