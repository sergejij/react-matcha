import React from 'react';
import {
  Route, useRouteMatch, Switch, useParams,
} from 'react-router-dom';

import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import { SettingsPage } from './UserData/styled';
import UserData from './UserData/UserData';
import UserPhotos from './UserPhotos/UserPhotos';
import UserSecurity from './UserSecurity/UserSecurity';
import axios from 'axios';
import { devAPI } from '../../api/api';

export default () => {
  const [activeSetting, setActiveSetting] = React.useState(null);
  const match = useRouteMatch();

  const [users, setUsers] = React.useState([]);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });

    devAPI
      .usersList()
      .then(
        ({data}) => {
          console.log(data);
          setUserData(data.Content);
        },
        (err) => console.error("ERROR settings getUserInfo:", err)
      )
      .catch((err) => console.error("ERROR settings getUserInfo:", err))
  }, []);

  return (
    users.length !== 0 &&
    <Content>
      <Aside activeSetting={activeSetting} match={match} isSettings headline="Настройки" />
      <SettingsPage>
        <Switch>
          <Route onClick={() => setActiveSetting(0)} path={`${match.path}/user-data`}>
            <UserData />
          </Route>
          <Route onClick={() => setActiveSetting(1)} path={`${match.path}/user-security`}>
            <UserSecurity />
          </Route>
          <Route onClick={() => setActiveSetting(2)} path={`${match.path}/user-photos`}>
            <UserPhotos />
          </Route>
        </Switch>
      </SettingsPage>
    </Content>
  );
};
