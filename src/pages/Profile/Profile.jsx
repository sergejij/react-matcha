import React from 'react';

import axios from 'axios';
import ProfilePage from './styled';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader/ProfileHeader';

export default ({ id }) => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);
  const [currentUser] = users.filter((user) => user.id === id);

  return (
    <ProfilePage>
      <ProfileHeader currentUser={currentUser} />
      <ProfileTabs currentUser={currentUser} users={users} />
    </ProfilePage>
  );
};
