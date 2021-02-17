import React from 'react';
import Aside from '../../components/Aside/Aside';
import { Content } from '../../styled';
import UserData from './UserData/UserData';
import { SettingsPage } from './UserData/styled';

export default ({ user }) => (
  <Content>
    <Aside isSettings headline="Настройки" />
    <SettingsPage>
      <UserData user={user} />
    </SettingsPage>
  </Content>
);
