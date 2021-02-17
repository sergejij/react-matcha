import React from 'react';
import ProfileVisitorsStyled from './styled';
import Carts from '../../../components/Carts/Carts';

const ProfileVisitors = ({ users }) => (
  <ProfileVisitorsStyled>
    <Carts users={users} buttonText="Нравится" />
  </ProfileVisitorsStyled>
);

export default ProfileVisitors;
