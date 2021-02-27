import React from 'react';
import {
  Route, useRouteMatch, Switch,
} from 'react-router-dom';

import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import { SettingsPage } from './UserData/styled';
import UserData from './UserData/UserData';
import UserPhotos from './UserPhotos/UserPhotos';

export default ({ user }) => {
  const [activeSetting, setActiveSetting] = React.useState(null);
  const match = useRouteMatch();

  return (
    <Content>
      <Aside activeSetting={activeSetting} match={match} isSettings headline="Настройки" />
      <SettingsPage>
        <Switch>
          <Route onClick={() => setActiveSetting(0)} path={`${match.path}/user-data`}>
            <UserData user={user} />
          </Route>
          <Route onClick={() => setActiveSetting(1)} path={`${match.path}/user-photos`}>
            <UserPhotos />
          </Route>
        </Switch>
      </SettingsPage>
    </Content>
  );
};
