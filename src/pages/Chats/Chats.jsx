import React from 'react';
import Chat from './Chat/Chat';
import Profile from '../Profile/Profile';
import Aside from '../../components/Aside/Aside';
import { Content } from '../../styled';

export default () => {
  const [isShownUserPage, setIsShownUserPage] = React.useState(false);

  const clickUserChat = () => {
    setIsShownUserPage((prevState) => !prevState);
  };

  return (
    <Content>
      <Aside isSettings={false} headline="Чаты" />
      {isShownUserPage ? <Profile id={1} /> : <Chat clickUserChat={clickUserChat} />}
    </Content>
  );
};
