import React from 'react';
import { AsideItem, AsidePhoto } from './styled';

const User = ({
  name, img, isActive, chooseConversation, id, isChat, surname, isMobile
}) => {
  return (
    <AsideItem
      to={`/${isChat ? 'chats' : 'search'}/${id}`}
      onClick={chooseConversation}
      className={isActive && 'active'}
    >
      <AsidePhoto src={img} alt="Фото профиля" />
      {!isMobile && <p>{name} {surname}</p>}
    </AsideItem>
  );
}

export default User;
