import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {
  SettingsDataHeaderBoxStyled,
  SettingsDataHeaderPhotoImg,
  SettingsDataRow, ShareLocationStyled,
  SettingsDataStyled, SettingsDataHeaderPhotoContainer, SettingsDataHeaderPhotoEdit,
} from './styled';
import Button from '../../../components/Button';
import { userInfoApi, userPhotosApi } from '../../../api/api';
import { Redirect } from 'react-router-dom';

const SettingsDataHeaderBox = ({ userData }) => (
  <div>
    <h2>{`${userData.name} ${userData.surname}`}</h2>
    <p>
      <b>{`${userData.post} - `}</b>
      {userData.location}
      <span>{`${userData.age}  лет`}</span>
    </p>
  </div>
);

const ShareLocation = ({ isSharedLocation, setIsSharedLocation }) => (
  <ShareLocationStyled>
    <input id="share-location" type="checkbox" defaultChecked={isSharedLocation} onChange={() => setIsSharedLocation((prev) => !prev)} />
    <label htmlFor="share-location">Делиться своим местоположением</label>
  </ShareLocationStyled>
);

const SettingsData = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [age, setAge] = React.useState('');
  const [post, setPost] = React.useState('');
  const [location, setLocation] = React.useState('');

  const [isSharedLocation, setIsSharedLocation] = React.useState(true);

  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
    userInfoApi
      .getUserInfo(localStorage.getItem('id'))
      .then(
        ({ data }) => {
          setName(data.Content.name);
          setSurname(data.Content.surname);
          setAge(data.Content.age);
          setPost(data.Content.post);
          setLocation(data.Content.location);
          setIsSharedLocation(data.Content.shareLocation);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR settings getUserInfo:", err)
        }
      )
      .catch((err) => console.error("ERROR settings getUserInfo:", err))
  }, []);

  const changeUserInfo = () => {
    userInfoApi
      .putUserInfo({ name, surname, age, post, location })
      .then(
        () => {},
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR settings putUserInfo:", err)
        }
      )
      .catch((err) => console.error("ERROR patchUserInfo name:", err));

    userInfoApi
      .patchSharingLocation(isSharedLocation)
      .then(
        () => {},
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR settings patchSharingLocation:", err)
        },
      )
      .catch((err) => console.error("ERROR settings patchSharingLocation:", err))
  };

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <SettingsDataStyled>
      <SettingsDataRow>
        <label htmlFor="name">
          Имя
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
          />
        </label>

        <label htmlFor="surname">
          Фамилия
          <input
            id="surname"
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            value={surname}
          />
        </label>
      </SettingsDataRow>

      <SettingsDataRow>
        <label htmlFor="age">
          Возраст
          <input
            id="age"
            onChange={(e) => setAge(e.target.value)}
            type="number"
            value={age}
          />
        </label>

        <label htmlFor="profession">
          Профессия
          <input
            id="profession"
            onChange={(e) => setPost(e.target.value)}
            type="text"
            value={post}
          />
        </label>
      </SettingsDataRow>

      <SettingsDataRow>
        <label htmlFor="age">
          Место жительства
          <input
            id="place"
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            value={location}
          />
        </label>
      </SettingsDataRow>

      <ShareLocation
        isSharedLocation={isSharedLocation}
        setIsSharedLocation={setIsSharedLocation}
      />

      <Button onClick={changeUserInfo} view="main" size={window.innerWidth > 700 ? 'M' : window.innerWidth > 500 ? 'S' : 'XS'} color="yellow">
        Сохранить
      </Button>
    </SettingsDataStyled>
  );
};

const UserData = () => {
  const [userData, setUserData] = React.useState({});
  const [avatar, setAvatar] = React.useState('');
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
    userInfoApi
      .getUserInfo(localStorage.getItem('id'))
      .then(
        ({ data }) => {
          setUserData(data.Content);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR settings getUserInfo:", err);
        }
      )
      .catch((err) => console.error("ERROR settings getUserInfo:", err))

    userPhotosApi
      .getAvatar()
      .then(
        ({ data }) => {
          setAvatar('data:image/bmp;base64,' + data.Content.avatar);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        }
      )
      .catch((err) => console.error("ERROR settings getAvatar:", err))
  }, []);

  const changePhoto = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append('avatar', file);

      userPhotosApi.putAvatar(formData)
      .then(() => {
        userPhotosApi
          .getAvatar()
          .then(
            ({ data }) => {
              setAvatar('data:image/bmp;base64,' + data.Content.avatar);
            },
            (err) => {
              if (err.response.status === 401) {
                setAmIAuthorized(() => false);
                localStorage.clear();
              }
            })
          .catch((err) => console.error("ERROR settings getAvatar:", err))
      })
      .catch((err) => console.error("ERROR settings uploadProfileAvatar:", err))
  }

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <SettingsDataHeaderBoxStyled>
        <SettingsDataHeaderPhotoContainer>
          <SettingsDataHeaderPhotoImg src={avatar} alt="Фото профиля" />
          <SettingsDataHeaderPhotoEdit htmlFor="settings-avatar">
            <EditIcon />
          </SettingsDataHeaderPhotoEdit>
          <input onChange={changePhoto} style={{ "visibility": "hidden" }} id="settings-avatar" type="file"/>
        </SettingsDataHeaderPhotoContainer>

        <SettingsDataHeaderBox userData={userData}  />
      </SettingsDataHeaderBoxStyled>
      <SettingsData userData={userData} />
    </>
  );
}

export default UserData;
