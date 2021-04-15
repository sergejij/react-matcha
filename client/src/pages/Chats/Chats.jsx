import React from 'react';
import { Route } from 'react-router-dom';
import Chat from './Chat/Chat';
import Aside from '../../components/Aside/Aside';
import { Content } from '../../styled';
import {usersApi} from "../../api/api";

export default () => {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState(null);

    React.useEffect(() => {
        usersApi.getUsers(0, 200)
            .then(({ data }) => {
                    console.log("GET USERS chats:", data);
                    setUsers(data.Content.users);
                },
                (err) => {
                    console.log("error USERS chats:", err);
                })
            .catch(err => console.log("ERROR USERS chats:", err))

    }, []);

  return (
    <Content>
      <Aside
        isMobile={window.innerWidth < 900}
        setId={setId}
        headline="Чаты"
        users={users}
        isChat
      />
      <Route path={`/chats/${id}`}>
        <Chat userId={id} />
      </Route>
    </Content>
  );
};
