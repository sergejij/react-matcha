import React from 'react';
import { Buttons, ProfileHeaderPhoto, ProfileHeaderBox } from './styled';
import Button from '../../../components/Button';
import { usersAPI } from '../../../api/api';

const ProfileHeader = ({ userData, id }) => {
  const [userAvatar, setUserAvatar] = React.useState({});

  React.useEffect(() => {
    usersAPI.getProfileAvatar()
      .then(
        (data) => {
            setUserAvatar('data:image/bmp;base64,' + data.data.Content.avatar);
        },
        (err) => {
          console.error("Error:", err);
        });
  }, []);

  return (
    <ProfileHeaderBox>
      <ProfileHeaderPhoto src={userAvatar} alt="Фото профиля" />

      <div>
        <h2>{`${userData.name} ${userData.surname}`}</h2>
        <p>
          <b>{userData.post}</b>
          {` - ${userData.location}`}
          <span>{`${userData.age} лет`}</span>
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
