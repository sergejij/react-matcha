import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import FilterListIcon from '@material-ui/icons/FilterList';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import ProfileImg from '../../assets/images/Chats/liza.png';
import {
  ChatsAsideHeader, ChatsAsideItems, ChatsAsideStyled, FilterBox,
} from './styled';
import User from './User/User';
import SettingsItem from './SettingsItem/SettingsItem';

const Aside = ({
  match, isSettings, headline, isSearch, onClickFilter, activeSetting, users, setCurrentUserId, isChat,
}) => (
  <ChatsAsideStyled>
    <ChatsAsideHeader>
      <span>{headline}</span>
    </ChatsAsideHeader>
    {
      isSearch && (
        <FilterBox onClick={onClickFilter}>
          <FilterListIcon />
        </FilterBox>
      )
    }
    <ChatsAsideItems isSearch={isSearch}>
      {
        isSettings ? (
          <>
            <SettingsItem to={`${match.url}/user-data`} isActive={activeSetting === 0} textSetting="Данные пользователя">
              <PersonOutlineIcon />
            </SettingsItem>
            <SettingsItem to={`${match.url}/user-security`} isActive={activeSetting === 1} textSetting="Безопасность пользователя">
              <SecurityIcon />
            </SettingsItem>
            <SettingsItem to={`${match.url}/user-photos`} isActive={activeSetting === 3} textSetting="Фото пользователя">
              <CropOriginalIcon />
            </SettingsItem>
            <SettingsItem to={`${match.url}/active-sessions`} isActive={activeSetting === 3} textSetting="Активные сессии">
              <SettingsInputCompositeIcon />
            </SettingsItem>

          </>
        ) : (
          users.map((user, index) => (
            <User
              key={`${user}_${index}`}
              isActive={index === 0}
              name={user.name}
              img={ProfileImg}
              id={user.id}
              chooseConversation={() => setCurrentUserId(user.id)}
              isChat={isChat}
            />
          ))
        )
      }
    </ChatsAsideItems>

  </ChatsAsideStyled>

);

export default Aside;
