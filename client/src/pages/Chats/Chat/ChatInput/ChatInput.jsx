import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import { ChatInputStyled, TA, SendIconStyled } from './styled';

const ChatInput = () => {
  const [message, setMessage] = React.useState('');
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
        <SendIcon style={{ width: 35, height: 35 }} />
      </SendIconStyled>
    </ChatInputStyled>
  );
};

export default ChatInput;
