import React from 'react';
import { Route } from 'react-router-dom';

import Profile from './pages/Profile/Profile';
import Chats from './pages/Chats/Chats';
import Search from './pages/Search/Search';
import Pairs from './pages/Pairs/Pairs';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <aside /> */}
      <div className="content">
        <Route path="/" exact component={Profile} />
        <Route path="/chats" exact component={Chats} />
        <Route path="/search" exact component={Search} />
        <Route path="/pairs" exact component={Pairs} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/login" exact component={Login} />
      </div>
    </div>
  );
}

export default App;
