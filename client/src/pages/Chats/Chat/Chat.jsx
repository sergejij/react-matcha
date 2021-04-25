import React from 'react';
import ChatHeader from './ChatHeader';

import { ChatStyled } from './styled';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';

const Chat = ({ userId, socket }) => (
  <ChatStyled>
    <ChatHeader userId={userId} />
    <ChatMessages userId={userId} />
    <ChatInput socket={socket} userId={userId} />
  </ChatStyled>
);

export default Chat;
