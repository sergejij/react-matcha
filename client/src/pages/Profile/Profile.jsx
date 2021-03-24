import React from 'react';
import {
  useParams,
} from 'react-router-dom';

import axios from 'axios';
import ProfilePage from './styled';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ReactDOM from 'react-dom';
import { Modal } from '../Login/styled';
import RegistrationForm from '../Login/RegistrationForm';
import ModalAddData from '../../components/ModalAddData/ModalAddData';
import { usersAPI } from '../../api/api';

export default ({ identifier }) => {
  const [users, setUsers] = React.useState([]);
  const id = identifier === undefined ? useParams().id : identifier;
  const [isRequiredEmpty, setIsRequiredEmpty] = React.useState(false);

  React.useEffect(() => {
    usersAPI.getUser(id)
      .then(
        ({ data }) => {
        console.log(data.Content);
        if (!(!!data.Content.sex &&
          !!data.Content.sexPreference &&
          !!data.Content.biography &&
          !!data.Content.interests &&
          !!data.Content.mainPhoto)) {
          setIsRequiredEmpty(true);
          console.log('setIsRequiredEmpty(true);');
        }
        setUsers(data.Content);
      },
      (err) => {
        console.error(err);
      });
  }, []);
  // const [currentUser] = users.filter((user) => user.id === Number(id));
  const currentUser = 1;

  return (
      isRequiredEmpty ? (
        <ModalAddData />
      ) : (
        <ProfilePage>
          <ProfileHeader currentUser={currentUser} />
          <ProfileTabs currentUser={currentUser} users={users} />
        </ProfilePage>
      )
  );
};
