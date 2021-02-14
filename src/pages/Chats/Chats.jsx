import React from 'react';
import ChatsAside from './ChatsAside/ChatsAside';
import Chat from './Chat/Chat';
import ChatsStyled from './styled';
import Profile from '../Profile/Profile';

export default ({ users }) => {
  const [isShownUserPage, setIsShownUserPage] = React.useState(false);

  const clickUserChat = () => {
    setIsShownUserPage((prevState) => !prevState);
  };

  return (
    <ChatsStyled>
      <ChatsAside />
      {isShownUserPage ? <Profile user={users[0]} /> : <Chat clickUserChat={clickUserChat} />}
    </ChatsStyled>
  );
};
