import React from 'react';
import {
  Redirect, useParams,
} from 'react-router-dom';

import ProfilePage from './styled';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ModalAddData from '../../components/ModalAddData/ModalAddData';
import {userInfoApi, userPhotosApi, usersApi} from '../../api/api';

export default ({ userId }) => {
  const id = userId || useParams().id;

  console.log("IDD:", id);
  const [isRequiredEmpty, setIsRequiredEmpty] = React.useState(false);
  const [isProfilePhotoEmpty, setIsProfilePhotoEmpty] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);
  const myId = localStorage.getItem('id');

  React.useEffect(() => {
    userInfoApi.getUserInfo(id)
      .then(
        (data) => {
            console.log("DATAAAAAAAAAAAAAAAA:", data);
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
            console.error('Error getUserInfo:', err);
        if (err.response.status === 401) {
          setAmIAuthorized(() => false);
          localStorage.clear();
        }
      },
      (err) => console.error('Error getUserInfo:', err));
  }, [id]);

  React.useEffect(() => {
      userPhotosApi.getAvatar()
      .then(
      ({ data }) => {
          setIsProfilePhotoEmpty(data.Content.avatar == null);
      },
      (err) => {
          console.error('Error getProfileAvatar:', err);
        if (err.response.status === 401) {
          setAmIAuthorized(() => false);
          localStorage.clear();
        }
        console.error("Error getProfileAvatar:", err);
      });
  }, []);

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  if (myId !== id) {
      usersApi
          .putVisit(id)
          .then(
              () => {

                  },
              (err) => console.error("ERROR putVisit:", err)
          )
          .catch((err) => console.error("ERROR putVisit:", err))
  }

  return (
      isRequiredEmpty || isProfilePhotoEmpty ? (
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
