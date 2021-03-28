import React from 'react';
import { ProfilePhotosStyled } from './styled';

import zero from '../../../assets/images/Profile/0.jpeg';
import first from '../../../assets/images/Profile/1.jpg';
import second from '../../../assets/images/Profile/2.jpg';
import third from '../../../assets/images/Profile/3.jpg';
import fourth from '../../../assets/images/Profile/4.jpg';
import Slider from './Slider/Slider';
import { Link } from 'react-router-dom';

const PHOTO_SET = [zero, first, second, third, fourth];

const ProfilePhotos = () => (
  <ProfilePhotosStyled>
    <Slider images={PHOTO_SET} />
    <Link to="/settings/user-photos">Обновить/добавить фотографии</Link>
  </ProfilePhotosStyled>
);
export default ProfilePhotos;
