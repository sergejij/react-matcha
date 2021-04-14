import React from 'react';
import ProfileVisitorsStyled from './styled';
import UsersCarts from '../../../components/Carts/UsersCarts';

const ProfileVisitors = ({ visitors }) => (
  <ProfileVisitorsStyled>
    <UsersCarts users={visitors} buttonText="Нравится" />
  </ProfileVisitorsStyled>
);

export default ProfileVisitors;
