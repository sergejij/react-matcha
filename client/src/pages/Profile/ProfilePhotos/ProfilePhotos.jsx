import React from 'react';
import { ProfilePhotosStyled } from './styled';

import Slider from './Slider/Slider';
import { Link, Redirect } from 'react-router-dom';
import {userPhotosApi} from '../../../api/api';

const ProfilePhotos = ({ id, isMyProfile }) => {
  const [photos, setPhotos] = React.useState([]);
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
      userPhotosApi.getPhotos(id)
      .then(
        ({ data }) => {
            console.log(data);
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
      {isMyProfile && <Link to="/settings/user-photos">Обновить/добавить фотографии</Link>}
    </ProfilePhotosStyled>
  );
}
export default ProfilePhotos;
