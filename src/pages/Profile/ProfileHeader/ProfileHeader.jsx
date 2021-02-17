import React from 'react';
import { Buttons, ProfileHeaderPhoto, ProfileHeaderBox } from './styled';
import ProfileImg from '../../../assets/images/Profile/0.jpeg';
import Button from '../../../components/Button';

const ProfileHeader = ({ currentUser }) => {
  console.log(currentUser);
  if (!currentUser) {
    return null;
  }

  return (
    <ProfileHeaderBox>
      <ProfileHeaderPhoto src={ProfileImg} alt="Фото профиля" />

      <div>
        <h2>
          {currentUser.name}
          {' '}
          {currentUser.surname}
        </h2>
        <p>
          <b>{currentUser.profession}</b>
          {' '}
          -
          {' '}
          {currentUser.place_of_living}
          {'   '}
          <span>
            {currentUser.age}
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
};

export default ProfileHeader;
