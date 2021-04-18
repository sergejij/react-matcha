import React from 'react';
import {
  Redirect, useParams,
} from 'react-router-dom';

import ProfilePage from './styled';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ModalAddData from '../../components/ModalAddData/ModalAddData';
import {userInfoApi, userPhotosApi, usersApi} from '../../api/api';
import socket from "../../api/socket";

export default ({ userId }) => {
  const id = userId || useParams().id;

  const [isRequiredEmpty, setIsRequiredEmpty] = React.useState(false);
  const [isProfilePhotoEmpty, setIsProfilePhotoEmpty] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);
  const myId = localStorage.getItem('id');
  const isMyProfile = myId === id;

    socket.onmessage = function(event) {
        console.log("Получены данные " + event.data);
    };



    socket.onopen = () => {
          console.log("IN ONOPEN");
          socket.send("hello backend");
          socket.send("hello backend");
          socket.send("hello backend");
          socket.send("hello backend");
          socket.send("hello backend");
          socket.send("hello backend");
      }

      socket.onclose = () => {
          console.log("IN ONCLOSE");
      }
        socket.onerror = function(error) {
            alert("Ошибка " + error.message);
        };

  React.useEffect(() => {

    userInfoApi.getUserInfo(id)
      .then(
        ({data}) => {
          setAmIAuthorized(() => true);
          setUserData(data.Content);
          if (!(!!data.Content.sex &&
            !!data.Content.age &&
            !!data.Content.relationshipStatus &&
            !!data.Content.sexPreference &&
            !!data.Content.biography)) {
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

  if (!isMyProfile) {
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
      (isRequiredEmpty || isProfilePhotoEmpty) && isMyProfile ? (
          (Object.keys(userData).length !== 0) &&
          <ModalAddData setIsRequiredEmpty={setIsRequiredEmpty} setIsProfilePhotoEmpty={setIsProfilePhotoEmpty} userData={userData} />
      ) : (
        <ProfilePage>
          <ProfileHeader userData={userData} id={id} />
          <ProfileTabs isMyProfile={isMyProfile} defaultTab={0} userData={userData} id={id} />
        </ProfilePage>
      )
  );
};
