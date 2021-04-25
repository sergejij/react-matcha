import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import { ChatInputStyled, TA, SendIconStyled } from './styled';
const ChatInput = ({userId, socket}) => {
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
      console.log(socket)
    if (socket) {
        console.log("userId, message", userId, message);
        socket.sendMessage(message, userId);
    }
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
