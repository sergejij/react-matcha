import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ProfileImg from '../../../assets/images/Profile/0.jpeg';
import {
  SettingsDataHeaderBoxStyled,
  SettingsDataHeaderPhotoImg,
  SettingsDataRow, ShareLocationStyled,
  SettingsDataStyled, SettingsDataHeaderPhotoContainer, SettingsDataHeaderPhotoEdit,
} from './styled';
import Button from '../../../components/Button';

const SettingsDataHeaderBox = ({ user }) => {
  console.log(user);

  return (
    <div>
      <h2>
        {user.name}
        {' '}
        {user.surname}
      </h2>
      <p>
        <b>{user.profession}</b>
        {' '}
        -
        {' '}
        {user.place_of_living}
        <span>
          {user.age}
          {' '}
          лет
        </span>
      </p>
    </div>
  );
};

const ShareLocation = ({ isSharedLocation, setIsSharedLocation }) => (
  <ShareLocationStyled>
    <input id="share-location" type="checkbox" checked={isSharedLocation} onChange={() => setIsSharedLocation((prev) => !prev)} />
    <label htmlFor="share-location">Делиться своим местоположением</label>
  </ShareLocationStyled>
);

const SettingsData = () => {
  const [name, setName] = React.useState('Ричард');
  const [surname, setSurname] = React.useState('Хендрикс');
  const [email, setEmail] = React.useState('richi@paper.com');
  const [login, setLogin] = React.useState('richi');
  const [age, setAge] = React.useState('27');
  const [profession, setProfession] = React.useState('Программист');
  const [isSharedLocation, setIsSharedLocation] = React.useState(true);

  return (
    <SettingsDataStyled>
      <SettingsDataRow key="1">
        <label htmlFor="name">
          Имя
          <input id="name" onChange={(e) => setName(e.target.value)} type="text" value={name} />
        </label>

        <label htmlFor="name">
          Фамилия
          <input id="surname" onChange={(e) => setSurname(e.target.value)} type="text" value={surname} />
        </label>
      </SettingsDataRow>

      <SettingsDataRow key="2">
        <label htmlFor="email">
          Email
          <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
        </label>

        <label htmlFor="login">
          Логин
          <input id="login" onChange={(e) => setLogin(e.target.value)} type="text" value={login} />
        </label>
      </SettingsDataRow>

      <SettingsDataRow key="3">
        <label htmlFor="age">
          Возраст
          <input id="age" onChange={(e) => setAge(e.target.value)} type="number" value={age} />
        </label>

        <label htmlFor="profession">
          Профессия
          <input id="profession" onChange={(e) => setProfession(e.target.value)} type="text" value={profession} />
        </label>
      </SettingsDataRow>

      <SettingsDataRow key="4">
        <label htmlFor="">
          Старый пароль
          <input id="old_pass" type="password" />
        </label>

        <label htmlFor="">
          Новый пароль
          <input id="new_pass" type="password" />
        </label>
      </SettingsDataRow>

      <ShareLocation
        isSharedLocation={isSharedLocation}
        setIsSharedLocation={setIsSharedLocation}
      />

      <Button view="main" size="M" color="yellow">
        Сохранить
      </Button>
    </SettingsDataStyled>
  );
};

const UserData = ({ user }) => {
  console.log(user);

  return (
    <>
      <SettingsDataHeaderBoxStyled>
        <SettingsDataHeaderPhotoContainer>
          <SettingsDataHeaderPhotoImg src={ProfileImg} alt="Фото профиля" />
          <SettingsDataHeaderPhotoEdit><EditIcon /></SettingsDataHeaderPhotoEdit>
        </SettingsDataHeaderPhotoContainer>
        <SettingsDataHeaderBox user={user} />
      </SettingsDataHeaderBoxStyled>
      <SettingsData />
    </>
  );
};

export default UserData;
