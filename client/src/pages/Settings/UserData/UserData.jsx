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

const SettingsDataHeaderBox = ({ user }) => (
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


const SettingsData = () => {
  const [name, setName] = React.useState('Ричард');
  const [surname, setSurname] = React.useState('Хендрикс');
  const [age, setAge] = React.useState('27');
  const [profession, setProfession] = React.useState('Программист');
  const [place, setPlace] = React.useState('Москва');

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
        <label htmlFor="age">
          Место жительства
          <input id="place" onChange={(e) => setPlace(e.target.value)} type="text" value={place} />
        </label>
      </SettingsDataRow>


      <Button view="main" size="M" color="yellow">
        Сохранить
      </Button>
    </SettingsDataStyled>
  );
};

const UserData = ({ user }) => (
  <UserDataStyled>
    <SettingsDataHeaderBoxStyled>
      <SettingsDataHeaderPhotoContainer>
        <SettingsDataHeaderPhotoImg src={ProfileImg} alt="Фото профиля" />
        <SettingsDataHeaderPhotoEdit><EditIcon /></SettingsDataHeaderPhotoEdit>
      </SettingsDataHeaderPhotoContainer>
      <SettingsDataHeaderBox user={user} />
    </SettingsDataHeaderBoxStyled>
    <SettingsData />
  </UserDataStyled>
);

export default UserData;
