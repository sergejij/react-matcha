import React from 'react';

import { ChatMessagesStyled } from './styled';
import Message from './Message';

const messages = [
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Привет))',
  },
  {
    isMyMessage: false,
    text: 'Привет)',
  },
  {
    isMyMessage: true,
    text: 'Бла бла?',
  },
  {
    isMyMessage: false,
    text: 'Бла бла бла',
  },
  {
    isMyMessage: true,
    text: 'Бла)',
  },
  {
    isMyMessage: false,
    text: 'Бла',
  },
  {
    isMyMessage: true,
    text: 'Бла бла бла',
  },
];

const ChatMessages = () => (
  <ChatMessagesStyled>
    {
      messages.map(({ isMyMessage, text }) => (
        <Message isMyMessage={isMyMessage} text={text} />
      ))
    }
  </ChatMessagesStyled>
);

export default ChatMessages;
