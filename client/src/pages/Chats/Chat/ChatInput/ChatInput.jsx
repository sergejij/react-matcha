import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import { ChatInputStyled, TA, SendIconStyled } from './styled';
import socket from "../../../../api/socket";

const ChatInput = ({userId}) => {
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
      const response = {
          Type: "Message",
          Message: {
              "Receiver": userId,
              "Content":  message
          }
      };

    socket.send(JSON.stringify(response));
    setMessage('');
  }

  return (
    <ChatInputStyled>
      <TA
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        contenteditable="true"
        placeholder="Написать сообщение..."
      >
        {message}
      </TA>
      <SendIconStyled>
        <SendIcon onClick={sendMessage} style={{ width: 35, height: 35 }} />
      </SendIconStyled>
    </ChatInputStyled>
  );
};

export default ChatInput;
