import React from 'react';
import ChatHeader from './ChatHeader';

import { ChatStyled } from './styled';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';

const Chat = ({ userId }) => (
  <ChatStyled>
    <ChatHeader userId={userId} />
    <ChatMessages />
    <ChatInput />
  </ChatStyled>
);

export default Chat;
