import React from 'react';
import ChatHeader from './ChatHeader';

import { ChatStyled } from './styled';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';

const Chat = ({ userId, socket, newMessage }) => {
    const [messages, setMessages] = React.useState([]);

    return (
        <ChatStyled>
            <ChatHeader userId={userId} />
            <ChatMessages messages={messages} setMessages={setMessages} newMessage={newMessage} userId={userId} />
            <ChatInput setMessages={setMessages} socket={socket} userId={userId} />
        </ChatStyled>
    );
}

export default Chat;
