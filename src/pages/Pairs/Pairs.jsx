import React from 'react';

import UsersCarts from '../../components/Carts/UsersCarts';
import { Content } from '../../styled';

export default ({ users }) => (
  <Content>
    <UsersCarts users={users} buttonText="Общаться" />
  </Content>
);
