import React from 'react';
import { ChatsAsideItem, ChatsAsidePhoto } from './styled';

const ChatsUser = ({
  name, img, isActive, isHeader,
}) => (
  <ChatsAsideItem isHeader={isHeader} className={isActive && 'active'}>
    <ChatsAsidePhoto src={img} alt="Фото профиля" />
    <p>{name}</p>
  </ChatsAsideItem>
);

export default ChatsUser;
