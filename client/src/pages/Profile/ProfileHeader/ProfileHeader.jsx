import React from 'react';
import { Buttons, ProfileHeaderPhoto, ProfileHeaderBox } from './styled';
import Button from '../../../components/Button';
import { usersAPI } from '../../../api/api';
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
    usersAPI.getProfileAvatar()
      .then(
        (data) => {
            setUserAvatar('data:image/bmp;base64,' + data.data.Content.avatar);
        },
        (err) => {
          console.log("ERR:",err.response);
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("Error:", err);
        });
  }, []);

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <ProfileHeaderBox>
      <ProfileHeaderPhoto src={userAvatar} alt="Фото профиля" />

      <div>
        <h2>{`${userData.name} ${userData.surname}`}</h2>
        <p>
          <b>{userData.post}</b>
          {` - ${userData.location}`}
          <span>{`${getAge(userData.age)}`}</span>
        </p>

        <Buttons>
          <Button size="S" view="out">Не нравится</Button>
          <Button size="S" view="main">Нравится</Button>
        </Buttons>
      </div>
    </ProfileHeaderBox>
  );
};

export default ProfileHeader;
