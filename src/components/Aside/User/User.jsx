import React from 'react';
import { AsideItem, AsidePhoto } from './styled';

const ChatsUser = ({
  name, img, isActive, isHeader, clickUserChat,
}) => (
  <AsideItem onClick={clickUserChat} isHeader={isHeader} className={isActive && 'active'}>
    <AsidePhoto src={img} alt="Фото профиля" />
    <p>{name}</p>
  </AsideItem>
);

export default ChatsUser;
