import React from 'react';
import { Buttons, ProfileHeaderPhoto, ProfileHeaderBox } from './styled';
import ProfileImg from '../../../assets/images/Profile/0.jpeg';
import Button from '../../../components/Button';

const ProfileHeader = () => (
  <ProfileHeaderBox>
    <ProfileHeaderPhoto src={ProfileImg} alt="Фото профиля" />

    <div>
      <h2>Ричард Хендрикс</h2>
      <p>
        <b>Программист</b>
        {' '}
        - Кремниевая долина
        {'   '}
        <span>27 лет</span>
      </p>

      <Buttons>
        <Button size="S" view="out">Не нравится</Button>
        <Button size="S" view="main">Нравится</Button>
      </Buttons>
    </div>
  </ProfileHeaderBox>
);

export default ProfileHeader;
