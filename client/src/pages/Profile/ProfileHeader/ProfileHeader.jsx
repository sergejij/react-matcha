import React from 'react';
import { Buttons, ProfileHeaderPhoto, ProfileHeaderBox } from './styled';
import Button from '../../../components/Button';
import {userPhotosApi, usersApi} from '../../../api/api';
import { Redirect } from 'react-router-dom';

const getAge = (year) => {
  const remainder = year % 10;
  if (remainder === 1) {
    return `${year} год`;
  } else if (remainder === 2 || remainder === 3 || remainder === 4) {
    return `${year} года`;
  } else {
    return `${year} лет`;
  }
}

const ProfileHeader = ({ userData, id }) => {
  const [userAvatar, setUserAvatar] = React.useState({});
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
    userPhotosApi.getAvatar(id)
      .then(
        ({data}) => {
            setUserAvatar('data:image/bmp;base64,' + data.Content.avatar);
        },
        (err) => {
          console.log("ERR getAvatar:", err);
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        });
  }, [id]);

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  const like = () => {
    usersApi
        .putLike(id)
        .then(
            () => {},
            (err) => {
              console.log("ERR putLike:", err);
              if (err.response.status === 401) {
                setAmIAuthorized(() => false);
                localStorage.clear();
              }
            }
        )
        .catch((err) => console.log("ERR putLike:", err));
  }

  const dislike = () => {
    usersApi
        .putDislike(id)
        .then(
            () => {},
            (err) => {
              console.log("ERR putDislike:", err);
              if (err.response.status === 401) {
                setAmIAuthorized(() => false);
                localStorage.clear();
              }
            }
        )
        .catch((err) => console.log("ERR putDislike:", err));
  }

  return (
    <ProfileHeaderBox isNeedWrap={window.innerWidth < 500}>
      <ProfileHeaderPhoto src={userAvatar} alt="Фото профиля" />

      <div>
        <h2>{`${userData.name} ${userData.surname}`}</h2>
        <p>
          <b>{userData.post}</b>
          {` - ${userData.location}`}
          <span>{`${getAge(userData.age)}`}</span>
        </p>

        {id !== localStorage.getItem('id') && <Buttons>
          <Button onClick={like} size="S" like view="out"/>
          <Button onClick={dislike} size="S" dislike view="main"/>
        </Buttons>}
      </div>
    </ProfileHeaderBox>
  );
};

export default ProfileHeader;
