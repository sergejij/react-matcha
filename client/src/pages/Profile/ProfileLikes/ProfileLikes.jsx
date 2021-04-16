import React from 'react';
import ProfileLikesStyled from './styled';
import UsersCarts from '../../../components/Carts/UsersCarts';

const ProfileLikes = ({ likes }) => (
  <ProfileLikesStyled>
    <UsersCarts users={likes} buttonText="Нравится" />
  </ProfileLikesStyled>
);

export default ProfileLikes;
