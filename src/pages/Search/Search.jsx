import React from 'react';
import axios from 'axios';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import Profile from '../Profile/Profile';

const Search = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <Content>
      <Aside isSettings={false} isSearch headline="Поиск пары" users={users} />
      <Profile id={1} />
    </Content>
  );
};

export default Search;
