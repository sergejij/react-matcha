import React from 'react';

import { ChatMessagesStyled } from './styled';
import Message from './Message';
import {usersApi} from "../../../../api/api";

// const messages = [
//   {
//     isMyMessage: true,
//     text: 'Бла бла бла',
//   },
//   {
//     isMyMessage: true,
//     text: 'Привет))',
//   },
//   {
//     isMyMessage: true,
//     text: 'Бла бла бла',
//   },
//   {
//     isMyMessage: true,
//     text: 'Привет))',
//   },
//   {
//     isMyMessage: false,
//     text: 'Привет)',
//   },
// ];

const ChatMessages = ({userId}) => {
  const [messages, setMessages] = React.useState([]);

  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages])

  React.useEffect(() => {
    usersApi
        .getMessages(1, 200, userId)
        .then(
            ({data}) => {
              console.log("DATA:", data);
              setMessages(data.Content.messages);
            },
            (err) => console.error("ERROR getMessages:", err)
        )
        .catch((err) => console.error("ERROR getMessages:", err))
  }, [userId])

  return (
      <ChatMessagesStyled ref={messagesRef}>
        {
          messages.map(({ MyMessage, Content }, index) => (
              <Message key={`${Content}_${index}`} isMyMessage={MyMessage} text={Content} />
          ))
        }
      </ChatMessagesStyled>
  );
}

export default ChatMessages;
