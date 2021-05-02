import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import { ChatInputStyled, TA, SendIconStyled } from './styled';
const ChatInput = ({userId, socket, setMessages}) => {
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
      console.log("socket", socket);
    if (socket) {
        socket.sendMessage(message, userId);
        setMessages(messages => [{MyMessage: true, Content: message}].concat(messages));
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
