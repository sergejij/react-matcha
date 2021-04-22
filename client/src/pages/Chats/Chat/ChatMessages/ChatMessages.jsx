import React from 'react';

import { ChatMessagesStyled } from './styled';
import Message from './Message';

const messages = [
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
];

const ChatMessages = ({userId}) => {
  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages])

  return (
      <ChatMessagesStyled ref={messagesRef}>
        {
          messages.map(({ isMyMessage, text }, index) => (
              <Message key={`${text}_${index}`} isMyMessage={isMyMessage} text={text} />
          ))
        }
      </ChatMessagesStyled>
  );
}

export default ChatMessages;
