import React from 'react';
import { ChatHeaderStyled } from './styled';
import ChatsUser from '../ChatsUser/ChatsUser';
import ProfileImg from '../../../assets/images/Chats/liza.png';

const ChatHeader = ({ userId }) => (
  <ChatHeaderStyled>
    <ChatsUser userId={userId} isActive img={ProfileImg}  />
  </ChatHeaderStyled>
);

export default ChatHeader;
