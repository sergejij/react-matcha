import React from 'react';
import { AsideItem, AsidePhoto } from './styled';

const ChatsUser = ({
  name, img, isActive, chooseConversation, id,
}) => (
  <AsideItem to={`/chats/${id}`} onClick={chooseConversation} isHeader className={isActive && 'active'}>
    <AsidePhoto src={img} alt="Фото профиля" />
    <p>{name}</p>
  </AsideItem>
);

export default ChatsUser;
