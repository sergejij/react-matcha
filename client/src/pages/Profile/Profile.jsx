import React from 'react';
import {
  useParams,
} from 'react-router-dom';

import axios from 'axios';
import ProfilePage from './styled';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader/ProfileHeader';

export default ({ identifier }) => {
  const [users, setUsers] = React.useState([]);
  const id = identifier === undefined ? useParams().id : identifier;

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);
  const [currentUser] = users.filter((user) => user.id === Number(id));

  return (
    <ProfilePage>
      <ProfileHeader currentUser={currentUser} />
      <ProfileTabs currentUser={currentUser} users={users} />
    </ProfilePage>
  );
};
