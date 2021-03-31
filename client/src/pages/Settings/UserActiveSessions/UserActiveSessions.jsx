import React from 'react';
import { SettingsPage } from '../UserData/styled';
import { SessionBlockStyled } from './styled';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '../../../components/Button';
import CloseIcon from '@material-ui/icons/Close';

const SessionBlock = () => {

  return (
    <SessionBlockStyled>
      <LockOpenIcon style={{ fontSize: "35px" }} />
      <div>
        <h3>Windows 10</h3>
        <p>109.253.38.82 - Москва, Россия</p>
      </div>
      <CloseIcon className="close" style={{ fontSize: "25px" }} color="error" />
    </SessionBlockStyled>
  )
}

const UserActiveSessions = () => {
  return (
    <SettingsPage>
      <SessionBlock />
      <SessionBlock />
      <SessionBlock />
      <SessionBlock />
      <div style={{ marginBottom: "60px" }} />
      <Button size="L" color="BLACK">Закрыть все сессии</Button>
    </SettingsPage>
  );
}

export default UserActiveSessions;
