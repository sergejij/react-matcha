import React from 'react';
import { Buttons, ProfileHeaderPhoto, ProfileHeaderBox } from './styled';
import ProfileImg from '../../../assets/images/Profile/0.jpeg';
import Button from '../../../components/Button';

const ProfileHeader = ({ user }) => (
  <ProfileHeaderBox>
    <ProfileHeaderPhoto src={ProfileImg} alt="Фото профиля" />

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
        {'   '}
        <span>
          {user.age}
          {' '}
          лет
        </span>
      </p>

      <Buttons>
        <Button size="S" view="out">Не нравится</Button>
        <Button size="S" view="main">Нравится</Button>
      </Buttons>
    </div>
  </ProfileHeaderBox>
);

export default ProfileHeader;
