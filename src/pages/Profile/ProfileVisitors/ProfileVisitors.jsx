import React from 'react';
import ProfileVisitorsStyled from './styled';
import UsersCarts from '../../../components/Carts/UsersCarts';

const ProfileVisitors = ({ users }) => (
  <ProfileVisitorsStyled>
    <UsersCarts users={users} buttonText="Нравится" />
  </ProfileVisitorsStyled>
);

export default ProfileVisitors;
