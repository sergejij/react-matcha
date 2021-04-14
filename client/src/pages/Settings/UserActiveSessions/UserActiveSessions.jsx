import React from 'react';
import { SessionBlockStyled } from './styled';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '../../../components/Button';
import CloseIcon from '@material-ui/icons/Close';
import {userSessionApi} from "../../../api/api";

const SessionBlock = ({ id, IP, OS, Country, City }) => {
  return (
    <SessionBlockStyled>
      <LockOpenIcon style={{ fontSize: "35px" }} />
      <div>
        <h3>{OS}</h3>
        <p>{`${IP} - ${City}, ${Country}`}</p>
        <p>{`ID - ${id}`}</p>
      </div>
      <CloseIcon className="close" style={{ fontSize: "25px" }} color="error" />
    </SessionBlockStyled>
  )
}

const UserActiveSessions = () => {
    const [sessions, setSessions] = React.useState([]);

    React.useEffect(() => {
        userSessionApi
            .getSessions()
            .then(
                ({data}) => {
                    console.log(data.Content);
                    setSessions(data.Content.sessions)
                },
                (err) => console.error("ERROR userSessionApi:", err)
            )
            .catch((err) => console.error("ERROR userSessionApi:", err))
    }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {
            sessions.map((session) => <SessionBlock key={session.id} {...session} />)
        }
      <div style={{ marginBottom: "60px" }} />
      <Button size={window.innerWidth > 1100 ? "L" : "M"} color="BLACK">Закрыть все сессии</Button>
    </div>
  );
}

export default UserActiveSessions;
