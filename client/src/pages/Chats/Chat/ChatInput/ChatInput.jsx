import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import { ChatInputStyled, TA, SendIconStyled } from './styled';
import socket from "../../../../api/socket";

const ChatInput = () => {
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
    socket.send(message);
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
