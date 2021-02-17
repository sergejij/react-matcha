import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ProfileImg from '../../assets/images/Chats/liza.png';
import {
  ChatsAsideHeader, ChatsAsideItems, ChatsAsideStyled,
} from './styled';
import User from './User/User';
import SettingsItem from './SettingsItem/SettingsItem';

const users = ['Елизавета', 'Настя', 'Александра', 'Полина', 'Лана', 'Екатерина', 'Серафима', 'Анастасия', 'Даша'];

const Aside = ({ isSettings, headline }) => (
  <ChatsAsideStyled>
    <ChatsAsideHeader>
      <span>{headline}</span>
    </ChatsAsideHeader>
    <ChatsAsideItems>
      {
        isSettings ? (
          <>
            <SettingsItem isActive textSetting="Данные пользователя">
              <PersonOutlineIcon />
            </SettingsItem>
            <SettingsItem textSetting="Фото пользователя">
              <CropOriginalIcon />
            </SettingsItem>
          </>
        ) : (
          users.map((user, index) => (
            <User
              key={`${user}_${index}`}
              isActive={index === 0}
              name={user}
              img={ProfileImg}
            />
          ))
        )
      }
    </ChatsAsideItems>

  </ChatsAsideStyled>

);

export default Aside;
