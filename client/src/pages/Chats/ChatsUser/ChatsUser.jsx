import React from 'react';
import { ChatsAsideItem, ChatsAsidePhoto } from './styled';

const ChatsUser = ({
  img, isActive,  clickUserChat, user,
}) => {
  return (
    <ChatsAsideItem
      onClick={clickUserChat}
      className={isActive && 'active'}
      to={`/profile/${user.id}`}
    >
      <ChatsAsidePhoto src={img} alt="Фото профиля" />
      <p>{user.name}</p>
    </ChatsAsideItem>
  );
}

export default ChatsUser;
