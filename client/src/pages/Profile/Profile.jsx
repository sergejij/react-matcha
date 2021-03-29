import React from 'react';
import {
  useParams,
} from 'react-router-dom';

import ProfilePage from './styled';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ModalAddData from '../../components/ModalAddData/ModalAddData';
import { userInfoApi, usersAPI } from '../../api/api';

export default () => {
  const id = useParams().id;
  const [isRequiredEmpty, setIsRequiredEmpty] = React.useState(false);
  const [isProfilePhotoEmpty, setIsProfilePhotoEmpty] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    userInfoApi.getUserInfo(id)
      .then(
        (data) => {
          setUserData(data.data.Content);
          if (!(!!data.data.Content.sex &&
            !!data.data.Content.age &&
            !!data.data.Content.relationshipStatus &&
            !!data.data.Content.sexPreference &&
            !!data.data.Content.biography)) {
            setIsRequiredEmpty(true);
          } else {
            setIsRequiredEmpty(false);
          }
      },
      (err) => console.error(err));
  }, []);

  React.useEffect(() => {
    usersAPI.getProfileAvatar()
      .then(
      ({ data }) => {
          console.log(data.Content);
          setIsProfilePhotoEmpty(!data.Content.avatar);
      },
      (err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
      isRequiredEmpty || isProfilePhotoEmpty /*true*/ ? (
          (Object.keys(userData).length !== 0) &&
          <ModalAddData setIsRequiredEmpty={setIsRequiredEmpty} setIsProfilePhotoEmpty={setIsProfilePhotoEmpty} userData={userData} />
      ) : (
        <ProfilePage>
          <ProfileHeader userData={userData} id={id} />
          <ProfileTabs userData={userData} id={id} />
        </ProfilePage>
      )
  );
};
