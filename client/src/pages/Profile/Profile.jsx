import React from 'react';
import {
  Redirect, useParams,
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
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
    userInfoApi.getUserInfo(id)
      .then(
        (data) => {
            console.log('222222222222222222:', data);
          setAmIAuthorized(() => true);
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
      (err) => {
            console.log("33333333333333333:", err);
        if (err.response.status === 401) {
          setAmIAuthorized(() => false);
          localStorage.clear();
        }
      },
      (err) => console.log("11111111111111:", err));
  }, []);

  React.useEffect(() => {
    usersAPI.getProfileAvatar()
      .then(
      ({ data }) => {
          console.log('55555555555555:', data);
          console.log(data.Content);
          setIsProfilePhotoEmpty(data.Content.avatar == null);
      },
      (err) => {
          console.log('666666666666666666:', err);
        if (err.response.status === 401) {
          setAmIAuthorized(() => false);
          localStorage.clear();
        }
        console.error("Error:", err);
      });
  }, []);

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  console.log("123:", isRequiredEmpty, isProfilePhotoEmpty);
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
