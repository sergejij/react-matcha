import React from 'react';
import ChatsAside from './ChatsAside/ChatsAside';
import Chat from './Chat/Chat';
import ChatsStyled from './styled';

export default () => (
  <ChatsStyled>
    <ChatsAside />
    <Chat />
  </ChatsStyled>
);
