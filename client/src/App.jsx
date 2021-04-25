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
import socket from "./api/socket";

function App() {
  const match = useRouteMatch('/login');
  let intervalId;

  // добавить состояние или локалстораж в котором isAuth
  // тут запускаю интервал и в колбеке смотрю авторизован ли
  // но надо в каждом 401 менять состояние и при логауте
  // и придумать как останавливать когда не авторизован

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

  intervalId = setInterval(() => {
    if (localStorage.getItem('id')) {
      navigator.geolocation.getCurrentPosition(
        sendGeoPosition,
        sendErrGeoPosition, {
          enableHighAccuracy: true,
        })
    }
  }, 100000);
    if (sessionStorage.getItem("is_reloaded")) {
        alert("обновлен");
        socket.close();
    }

  return (
    <div className="App">
      {!match && <Menu />}
      <Switch>
        <Route path="/confirm-email" render={() => <ConfirmEmail />} />
        <Route path="/profile/:id" render={() => <Profile />} />
        <Route path="/chats" render={() => <Chats />} />
        <Route path="/search" component={Search} />
        <Route path="/pairs" render={() => <Pairs />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
