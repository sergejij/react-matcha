import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Chat from './Chat/Chat';
import Aside from '../../components/Aside/Aside';
import { Content } from '../../styled';
import {usersApi} from "../../api/api";

export default ({ socket, newMessage }) => {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

    React.useEffect(() => {
        usersApi.getChats(1, 200)
            .then(({ data }) => {
                    setUsers(data.Content.chats);
                },
                (err) => {
                    if (err.response.status === 401) {
                        setAmIAuthorized(false);
                        localStorage.clear();
                    }
                    console.error("error USERS chats:", err);
                })
            .catch(err => console.error("ERROR USERS chats:", err))

    }, []);

    if (!amIAuthorized) {
        return <Redirect to="/login" />;
    }

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
        <Chat newMessage={newMessage} socket={socket} userId={id} />
      </Route>
    </Content>
  );
};
