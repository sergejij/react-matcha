import React from 'react';
import { ChatsAsideItem, ChatsAsidePhoto } from './styled';

const ChatsUser = ({
  name, img, isActive, isHeader, clickUserChat,
}) => (
  <ChatsAsideItem onClick={clickUserChat} isHeader={isHeader} className={isActive && 'active'}>
    <ChatsAsidePhoto src={img} alt="Фото профиля" />
    <p>{name}</p>
  </ChatsAsideItem>
);

export default ChatsUser;
