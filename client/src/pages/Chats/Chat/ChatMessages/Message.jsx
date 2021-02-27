import React from 'react';
import { MessageStyled } from './styled';

const Message = ({ isMyMessage, text }) => (
  <MessageStyled isMyMessage={isMyMessage}>
    {text}
  </MessageStyled>
);

export default Message;
