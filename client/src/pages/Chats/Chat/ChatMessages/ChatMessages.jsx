import React from 'react';

import { ChatMessagesStyled } from './styled';
import Message from './Message';
import {usersApi} from "../../../../api/api";

const ChatMessages = ({userId, newMessage}) => {
  const [messages, setMessages] = React.useState([]);

  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages])

  React.useEffect(() => {
      if (newMessage && userId === newMessage.senderId) {
          console.log("newMessage.Content}", newMessage);
          setMessages(messages => messages.concat({MyMessage: false, Content: newMessage.message}));
      }
  }, [newMessage])

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

    console.log("MESSAGES:", messages);
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
