import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Chat from './Chat/Chat';
import Aside from '../../components/Aside/Aside';
import { Content } from '../../styled';

export default () => {
  const [users, setUsers] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);
  const [currentUser] = users.filter((user) => user.id === Number(currentUserId));

  return (
    <Content>
      <Aside
        setCurrentUserId={setCurrentUserId}
        headline="Чаты"
        users={users}
        isChat
      />
      <Route path={`/chats/${currentUserId}`}>
        <Chat user={currentUser} />
      </Route>
    </Content>
  );
};
