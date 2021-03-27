import React from 'react';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { ProfilePhotoStyled } from './styled';
import axios from 'axios';


const ProfilePhoto = ({ setIsProfilePhotoEmpty }) => {
  const uploadPhoto = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append('avatar', file);

    console.log(formData);
    axios({
      method: 'put',
      url: 'https://81.177.141.123:637/profile/upload_avatar',
      data: formData,
      withCredentials: true,
      headers: {
        'Content-Type': `multipart/form-data;`,
      },
    })
      .then(
        (data) => {
          console.log(data);
          setIsProfilePhotoEmpty(false);
        },
        (err) => {
          console.error("ERROR upload avatar:", err);
        }
      )
  }

  return (
      <ProfilePhotoStyled>
        <label onChange={uploadPhoto} htmlFor="photo">
          <WallpaperIcon style={{ width: 300, height: 300 }} />
          Добавить фото профиля &#9913;
          <input
            style={{ 'visibility': 'hidden' }}
            type="file"
            onChange={uploadPhoto}
            // onChange={(e) => e.target.files && setProfilePhoto(e.target.files[0])}
            id="photo" />
        </label>
        <h3>Шаг 2/2</h3>
      </ProfilePhotoStyled>
  );
};

export default ProfilePhoto;
