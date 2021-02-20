import React from 'react';
import { ChatHeaderStyled } from './styled';
import ChatsUser from '../ChatsUser/ChatsUser';
import ProfileImg from '../../../assets/images/Chats/liza.png';

const ChatHeader = ({ user }) => (
  <ChatHeaderStyled>
    <ChatsUser user={user} isActive img={ProfileImg} />
  </ChatHeaderStyled>
);

export default ChatHeader;
