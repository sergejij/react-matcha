import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ProfileImg from '../../../assets/images/Profile/0.jpeg';
import {
  SettingsDataHeaderBoxStyled,
  SettingsDataHeaderPhotoImg,
  SettingsDataRow, ShareLocationStyled,
  SettingsDataStyled, SettingsDataHeaderPhotoContainer, SettingsDataHeaderPhotoEdit, UserDataStyled,
} from './styled';
import Button from '../../../components/Button';
import { userAuthApi, userInfoApi } from '../../../api/api';

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
    <input id="share-location" type="checkbox" checked={isSharedLocation} onChange={() => setIsSharedLocation((prev) => !prev)} />
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
        },
        (err) => console.error("ERROR settings getUserInfo:", err)
      )
      .catch((err) => console.error("ERROR settings getUserInfo:", err))
  }, []);

  const changeUserInfo = () => {
    userInfoApi
      .putUserInfo()
  };


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

        <label htmlFor="name">
          Фамилия
          <input id="surname" onChange={(e) => setSurname(e.target.value)} type="text" value={surname} />
        </label>
      </SettingsDataRow>

      <SettingsDataRow>
        <label htmlFor="age">
          Возраст
          <input id="age" onChange={(e) => setAge(e.target.value)} type="number" value={age} />
        </label>

        <label htmlFor="profession">
          Профессия
          <input id="profession" onChange={(e) => setPost(e.target.value)} type="text" value={post} />
        </label>
      </SettingsDataRow>

      <SettingsDataRow>
        <label htmlFor="age">
          Место жительства
          <input id="place" onChange={(e) => setLocation(e.target.value)} type="text" value={location} />
        </label>
      </SettingsDataRow>

      <ShareLocation
        isSharedLocation={isSharedLocation}
        setIsSharedLocation={setIsSharedLocation}
      />

      <Button onClick={changeUserInfo} view="main" size="M" color="yellow">
        Сохранить
      </Button>
    </SettingsDataStyled>
  );
};

const UserData = () => {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    userInfoApi
      .getUserInfo(localStorage.getItem('id'))
      .then(
        ({ data }) => {
          setUserData(data.Content);
        },
        (err) => console.error("ERROR settings getUserInfo:", err)
      )
      .catch((err) => console.error("ERROR settings getUserInfo:", err))
  }, []);

  return (
    <>
      <SettingsDataHeaderBoxStyled>
        <SettingsDataHeaderPhotoContainer>
          <SettingsDataHeaderPhotoImg src={ProfileImg} alt="Фото профиля" />
          <SettingsDataHeaderPhotoEdit htmlFor="settings-avatar">
            <EditIcon />
          </SettingsDataHeaderPhotoEdit>
          <input style={{ "visibility": "hidden" }} id="settings-avatar" type="file"/>
        </SettingsDataHeaderPhotoContainer>

        <SettingsDataHeaderBox userData={userData}  />
      </SettingsDataHeaderBoxStyled>
      <SettingsData userData={userData} />
    </>
  );
}

export default UserData;
