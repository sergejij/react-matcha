import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import Profile from './pages/Profile/Profile';
import Chats from './pages/Chats/Chats';
import Search from './pages/Search/Search';
import Pairs from './pages/Pairs/Pairs';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Menu from './components/Menu/Menu';

import './App.css';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import { userInfoApi } from './api/api';
import createSocket from "./api/socket";
import {notification} from "antd";

function App() {
  const [socket, setSocket] = React.useState(null);
  const [messageToMe, setMessageToMe] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState(null);
  const [notificationToMe, setNotificationToMe] = React.useState(null);
  const [countUnreadMessages, setCountUnreadMessages] = React.useState(0);
  const match = useRouteMatch('/login');
  let intervalId;

    React.useEffect(() => {
        console.log("messageToMe:", messageToMe);
        if (messageToMe) {
            console.log(document.location.pathname, `/chats/${messageToMe.Sender}`);
            if (document.location.pathname === `/chats/${messageToMe.Sender}`) {
                setNewMessage({ message: messageToMe.Content, senderId: messageToMe.Sender})
            } else {
                notification.open({
                    message: `Тебе пришло новое сообщение от ${messageToMe.Sender}`, // делай тут запрос на получение имени и фамилии
                    description: messageToMe.Content,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        }
    }, [messageToMe]);

  function sendGeoPosition(position) {
    const {latitude, longitude} = position.coords;

    userInfoApi
      .sendLocation(latitude, longitude)
      .then(
        () => {},
        (err) => {
          console.log('error in sendLocation:', err);
          if (err.response.status === 401) {
            clearInterval(intervalId);
            localStorage.clear();
          }
        }
      )
      .catch((err) => console.error("ERROR sendLocation:", err));
  }

  function sendErrGeoPosition() {
    clearInterval(intervalId);
  }

  window.onload = () => {
      if (localStorage.getItem('id')) {
          setSocket(createSocket(setMessageToMe, setNotificationToMe));
      }
  }

  window.onbeforeunload = () => {
      socket.onClose();
  }

  intervalId = setInterval(() => {
    if (localStorage.getItem('id')) {
      navigator.geolocation.getCurrentPosition(
        sendGeoPosition,
        sendErrGeoPosition, {
          enableHighAccuracy: true,
        })
    }
  }, 180000);
    if (sessionStorage.getItem("is_reloaded")) {
        alert("обновлен");
        socket.close();
    }

    console.log("newMessage app:", newMessage);
    console.log("messageToMe app:", messageToMe);
  return (
    <div className="App">
      {!match && <Menu setSocket={setSocket} socket={socket || {onClose: () => console.error("SOCKET NOT CREATED YET")}} />}
      <Switch>
        <Route path="/confirm-email" render={() => <ConfirmEmail />} />
        <Route path="/profile/:id" render={() => <Profile />} />
        <Route path="/chats" render={() => <Chats socket={socket} newMessage={newMessage} />} />
        <Route path="/search" component={Search} />
        <Route path="/pairs" render={() => <Pairs />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/login" render={() =>
            <Login setMessageToMe={setMessageToMe} setNotificationToMe={setNotificationToMe} setSocket={setSocket} />} />
      </Switch>
    </div>
  );
}

export default App;
