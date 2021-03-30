import React from 'react';
import {
  SettingsDataRow,
  SettingsDataStyled, SettingsPasswords,
} from '../UserData/styled';
import Button from '../../../components/Button';
import { userAuthApi } from '../../../api/api';
import { Redirect } from 'react-router-dom';


const UserSecurity = () => {
  const [email, setEmail] = React.useState('');
  const [login, setLogin] = React.useState('');

  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
    userAuthApi
      .getAuthData()
      .then(
        ({ data }) => {
          setEmail(data.Content.email)
          setLogin(data.Content.login)
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
          }
          console.error("ERROR: settings getAuthData:", err);
        }
      )
      .catch((err) => console.error("ERROR: settings getAuthData:", err))
  }, []);

  const changeEmail = () => {
    userAuthApi
      .updateEmail(email)
      .then()
      .then(
        ({ data }) => {
          console.log(data);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
          }
          console.error("ERROR: settings updateEmail:", err)
        }
      )
      .catch((err) => console.error("ERROR: settings updateEmail:", err))
  };

  const changeLogin = () => {
    userAuthApi
      .updateLogin(login, password)
      .then()
      .then(
        ({ data }) => {
          console.log(data);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
          }
          console.error("ERROR: settings updateLogin:", err)
        }
      )
      .catch((err) => console.error("ERROR: settings updateLogin:", err))
  };

  const changePassword = () => {
    userAuthApi
      .updatePassword(oldPassword, newPassword)
      .then()
      .then(
        ({ data }) => {
          console.log(data);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
          }
          console.error("ERROR: settings updatePassword:", err)
        }
      )
      .catch((err) => console.error("ERROR: settings updatePassword:", err))
  };

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <SettingsDataStyled>
      <SettingsDataRow>
        <label htmlFor="email">
          Email
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
        </label>

        <Button onClick={changeEmail} view="main" size="M" color="yellow">
          Сохранить
        </Button>
      </SettingsDataRow>

      <SettingsDataRow>
        <SettingsPasswords>
          <label htmlFor="login">
            Логин
            <input
              id="login"
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              value={login}
            />
          </label>

          <label htmlFor="pass">
            Пароль
            <input onChange={(e) => setPassword(e.target.value)} value={password} id="pass" type="password" />
          </label>
        </SettingsPasswords>


        <Button onClick={changeLogin} view="main" size="M" color="yellow">
          Сохранить
        </Button>
      </SettingsDataRow>

      <SettingsDataRow>
        <SettingsPasswords>
        <label htmlFor="">
          Старый пароль
          <input onChange={(e) => setOldPassword(e.target.value)} id="old_pass" type="password" />
        </label>

        <label htmlFor="">
          Новый пароль
          <input onChange={(e) => setNewPassword(e.target.value)} id="new_pass" type="password" />
        </label>
        </SettingsPasswords>

        <Button onClick={changePassword} view="main" size="M" color="yellow">
          Сохранить
        </Button>
      </SettingsDataRow>

    </SettingsDataStyled>
  );
};


export default UserSecurity;
