import React from 'react';
import ProfileImg from '../../../assets/images/Profile/0.jpeg';
import { SettingsDataHeaderBoxStyled, SettingsDataHeaderPhotoStyled } from './styled';

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

const UserData = ({ user }) => {
  console.log(user);

  return (
    <SettingsDataHeaderBoxStyled>
      <SettingsDataHeaderPhotoStyled src={ProfileImg} alt="Фото профиля" />
      <SettingsDataHeaderBox user={user} />
    </SettingsDataHeaderBoxStyled>
  );
};

export default UserData;
