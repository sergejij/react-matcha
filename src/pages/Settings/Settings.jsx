import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import { SettingsPage } from './UserData/styled';
import UserData from './UserData/UserData';
import UserPhotos from './UserPhotos/UserPhotos';

export default ({ user }) => {
  const { url } = useRouteMatch();
  return (
    <Content>
      <Aside isSettings headline="Настройки" />
      <SettingsPage>
        <Route path={`${url}/user-info`} render={() => <UserData user={user} />} />
        <Route path={`${url}/user-photos`} render={() => <UserPhotos user={user} />} />
      </SettingsPage>
    </Content>
  );
};
