import React from 'react';
import axios from 'axios';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

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
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <div className="App">
      {!match && <Menu />}
      <Switch>
        <Route path="/profile/:id" render={() => <Profile />} />
        <Route path="/chats" render={() => <Chats users={users} />} />
        <Route path="/search" component={Search} />
        <Route path="/pairs" render={() => <Pairs users={users} />} />
        <Route path="/settings" render={() => <Settings user={users[0]} />} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
