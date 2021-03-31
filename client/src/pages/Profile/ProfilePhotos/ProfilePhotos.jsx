import React from 'react';
import { ProfilePhotosStyled } from './styled';

import zero from '../../../assets/images/Profile/0.jpeg';
import first from '../../../assets/images/Profile/1.jpg';
import second from '../../../assets/images/Profile/2.jpg';
import third from '../../../assets/images/Profile/3.jpg';
import fourth from '../../../assets/images/Profile/4.jpg';
import Slider from './Slider/Slider';
import { Link, Redirect } from 'react-router-dom';
import { usersAPI } from '../../../api/api';

const PHOTO_SET = [zero, first, second, third, fourth];

const ProfilePhotos = () => {
  const [photos, setPhotos] = React.useState([]);
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
    usersAPI.getProfilePhotos()
      .then(
        ({ data }) => {
          setPhotos(data.Content.photos);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.log("ERROR getProfileAvatar:", err)
        }
      )
      .catch((err) => console.log("ERROR getProfileAvatar:", err))
  }, []);

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <ProfilePhotosStyled>
      <Slider images={photos
        .filter((item) => item.Id !== null)
        .map((item) => 'data:image/bmp;base64,' + item.Content)}
      />
      <Link to="/settings/user-photos">Обновить/добавить фотографии</Link>
    </ProfilePhotosStyled>
  );
}
export default ProfilePhotos;
