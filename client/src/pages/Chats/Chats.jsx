import React from 'react';
import { Route } from 'react-router-dom';
import Chat from './Chat/Chat';
import Aside from '../../components/Aside/Aside';
import { Content } from '../../styled';
import {usersApi} from "../../api/api";
import socket from "../../api/socket";

export default () => {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState(null);

    React.useEffect(() => {
        usersApi.getUsers(0, 200)
            .then(({ data }) => {
                    setUsers(data.Content.users);
                },
                (err) => {
                    console.log("error USERS chats:", err);
                })
            .catch(err => console.log("ERROR USERS chats:", err))

    }, []);

    // const wsSend = (data) => {
    //     if(!socket.readyState){
    //         console.log("socketl:", socket);
    //         setTimeout(() => {
    //             wsSend(data);
    //         },100);
    //     } else {
    //         console.log("SENDING");
    //         socket.send(data);
    //     }
    // };
    //
    // socket.onmessage = function(event) {
    //     console.log("Получены данные " + event.data);
    // };
    // console.log("xyz")
    // wsSend(Math.random());
    // console.log("abc")

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
