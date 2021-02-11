import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import Profile from './pages/Profile/Profile';
import Chats from './pages/Chats/Chats';
import Search from './pages/Search/Search';
import Pairs from './pages/Pairs/Pairs';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Menu from './components/Menu/Menu';

import './App.css';

function App() {
  const match = useRouteMatch('/login');

  return (
    <div className="App">
      {!match && <Menu />}
      <Route path="/profile" component={Profile} />
      <Route path="/chats" component={Chats} />
      <Route path="/search" component={Search} />
      <Route path="/pairs" component={Pairs} />
      <Route path="/settings" component={Settings} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
