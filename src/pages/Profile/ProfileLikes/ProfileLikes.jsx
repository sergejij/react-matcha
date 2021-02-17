import React from 'react';
import ProfileLikesStyled from './styled';
import Carts from '../../../components/Carts/Carts';

const ProfileLikes = ({ users }) => (
  <ProfileLikesStyled>
    <Carts users={users} buttonText="Нравится" />
  </ProfileLikesStyled>
);

export default ProfileLikes;
