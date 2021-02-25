import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import Profile from '../Profile/Profile';

const Search = () => {
  const [users, setUsers] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <Content>
      <Aside
        setCurrentUserId={setCurrentUserId}
        isSettings={false}
        isSearch
        headline="Поиск пары"
        users={users}
      />
      <Route path={`/search/${currentUserId}`}>
        <Profile identifier={currentUserId} />
      </Route>
    </Content>
  );
};

export default Search;
