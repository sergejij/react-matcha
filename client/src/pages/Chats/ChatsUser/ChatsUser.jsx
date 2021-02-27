import React from 'react';
import { ChatsAsideItem, ChatsAsidePhoto } from './styled';

const ChatsUser = ({
  img, isActive, isHeader, clickUserChat, user,
}) => (
  <ChatsAsideItem
    onClick={clickUserChat}
    isHeader={isHeader}
    className={isActive && 'active'}
    to={`/profile/${user.id}`}
  >
    <ChatsAsidePhoto src={img} alt="Фото профиля" />
    <p>{user.name}</p>
  </ChatsAsideItem>
);

export default ChatsUser;
