import React from 'react';

import { ChatMessagesStyled } from './styled';
import Message from './Message';
import {usersApi} from "../../../../api/api";
import {Redirect} from "react-router-dom";

const ChatMessages = ({userId, newMessage, messages, setMessages}) => {
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);
  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages])

  React.useEffect(() => {
      if (newMessage && userId === newMessage.senderId) {
          setMessages(messages => [{MyMessage: false, Content: newMessage.message}].concat(messages));
      }
  }, [newMessage])

  React.useEffect(() => {
    usersApi
        .getMessages(1, 2000, userId)
        .then(
            ({data}) => {
              setMessages(data.Content.messages);
            },
            (err) => {
                if (err.response.status === 401) {
                    setAmIAuthorized(() => false);
                    localStorage.clear();
                }
                console.error("ERROR getMessages:", err);
            }
        )
        .catch((err) => console.error("ERROR getMessages:", err))
  }, [userId])

    if (!amIAuthorized) {
        return <Redirect to="/login" />;
    }

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
