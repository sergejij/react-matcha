import React from 'react';
import {
  SettingsDataHeaderBoxStyled,
  SettingsDataRow,
  SettingsDataStyled,
  ShareLocationStyled,
  UserDataStyled
} from '../UserData/styled';
import Button from '../../../components/Button';


const ShareLocation = ({ isSharedLocation, setIsSharedLocation }) => (
  <ShareLocationStyled>
    <input id="share-location" type="checkbox" checked={isSharedLocation} onChange={() => setIsSharedLocation((prev) => !prev)} />
    <label htmlFor="share-location">Делиться своим местоположением</label>
  </ShareLocationStyled>
);

const SettingsData = () => {
  const [email, setEmail] = React.useState('richi@paper.com');
  const [login, setLogin] = React.useState('richi');
  const [isSharedLocation, setIsSharedLocation] = React.useState(true);

  return (
    <SettingsDataStyled>

      <SettingsDataRow key="2">
        <label htmlFor="email">
          Email
          <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
        </label>

        <label htmlFor="login">
          Логин
          <input id="login" onChange={(e) => setLogin(e.target.value)} type="text" value={login} />
        </label>
      </SettingsDataRow>

      <SettingsDataRow key="4">
        <label htmlFor="">
          Старый пароль
          <input id="old_pass" type="password" />
        </label>

        <label htmlFor="">
          Новый пароль
          <input id="new_pass" type="password" />
        </label>
      </SettingsDataRow>

      <ShareLocation
        isSharedLocation={isSharedLocation}
        setIsSharedLocation={setIsSharedLocation}
      />

      <Button view="main" size="M" color="yellow">
        Сохранить
      </Button>
    </SettingsDataStyled>
  );
};

const UserSecurity = ({ user }) => (
  <UserDataStyled>
    <SettingsDataHeaderBoxStyled>
    </SettingsDataHeaderBoxStyled>
    <SettingsData />
  </UserDataStyled>
);

export default UserSecurity;
