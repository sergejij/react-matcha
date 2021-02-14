import React from 'react';
import { ChatHeaderStyled } from './styled';
import ChatsUser from '../ChatsUser/ChatsUser';
import ProfileImg from '../../../assets/images/Chats/liza.png';

const ChatHeader = ({ clickUserChat }) => (
  <ChatHeaderStyled>
    <ChatsUser clickUserChat={clickUserChat} isActive name="Елизавета" img={ProfileImg} />
  </ChatHeaderStyled>
);

export default ChatHeader;
