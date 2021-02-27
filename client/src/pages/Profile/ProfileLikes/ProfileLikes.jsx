import React from 'react';
import ProfileLikesStyled from './styled';
import UsersCarts from '../../../components/Carts/UsersCarts';

const ProfileLikes = ({ users }) => (
  <ProfileLikesStyled>
    <UsersCarts users={users} buttonText="Нравится" />
  </ProfileLikesStyled>
);

export default ProfileLikes;
