import React from 'react';
import { SessionBlockStyled } from './styled';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '../../../components/Button';
import CloseIcon from '@material-ui/icons/Close';
import {userSessionApi} from "../../../api/api";
import {Redirect} from "react-router-dom";

const SessionBlock = ({ Id, IP, OS, Country, City, Browser }) => {
    const [amIAuthorized, setAmIAuthorized] = React.useState(true);

    const closeSession = () => {
        userSessionApi
            .closeSession(Id)
            .then(
                () => {
                    window.location.reload(true)
                },
                (err) => {
                    if (err.response.status === 401) {
                        setAmIAuthorized(false);
                        localStorage.clear();
                    }
                    console.error("ERROR closeSession:", err)
                }
            )
            .catch((err) => console.error("ERROR closeSession:", err));
    }

    if (!amIAuthorized) {
        return <Redirect to="/login" />;
    }

  return (
    <SessionBlockStyled>
      <LockOpenIcon style={{ fontSize: "35px" }} />
      <div>
        <h3>{OS} - {Browser}</h3>
        <p>{`${IP} - ${City}, ${Country}`}</p>
      </div>
      <CloseIcon onClick={closeSession} className="close" style={{ fontSize: "25px" }} color="error" />
    </SessionBlockStyled>
  )
}

const UserActiveSessions = () => {
    const [sessions, setSessions] = React.useState([]);
    const [amIAuthorized, setAmIAuthorized] = React.useState(true);


    React.useEffect(() => {
        userSessionApi
            .getSessions()
            .then(
                ({data}) => {
                    setSessions(data.Content.sessions)
                },
                (err) => {
                    if (err.response.status === 401) {
                        setAmIAuthorized(false);
                        localStorage.clear();
                    }
                    console.error("ERROR userSessionApi:", err)
                }
            )
            .catch((err) => console.error("ERROR userSessionApi:", err))
    }, [])

    const closeAllSessions = () => {
        userSessionApi
            .closeAllSessions()
            .then(
                ({ data }) => {
                    const newSessions = sessions.filter(({ Id }) => Id === data.Content.mySessionID);
                    setSessions(newSessions);
                },
                (err) => {
                    if (err.response.status === 401) {
                        setAmIAuthorized(false);
                        localStorage.clear();
                    }
                    console.error("ERROR closeAllSessions:", err)
                }
            )
            .catch((err) => console.error("ERROR closeAllSessions:", err));
    };

    if (!amIAuthorized) {
        return <Redirect to="/login" />;
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {
            sessions.map((session, index) => <SessionBlock key={`${session.id}_${index}`} {...session} />)
        }
      <div style={{ marginBottom: "60px" }} />
      <Button
          size={window.innerWidth > 1100 ? "L" : "M"}
          color="BLACK"
          onClick={closeAllSessions}
      >
          Закрыть все сессии
      </Button>
    </div>
  );
}

export default UserActiveSessions;
