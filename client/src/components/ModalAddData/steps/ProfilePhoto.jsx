import React from 'react';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { ProfilePhotoStyled } from './styled';
import {userPhotosApi} from '../../../api/api';
import { MyLink } from '../../../styled';
import COLORS from '../../../constants';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const ProfilePhoto = ({ setIsProfilePhotoEmpty, setStepNumber, setNeedToRefresh }) => {
  const uploadPhoto = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append('avatar', file);

      userPhotosApi.putAvatar(formData)
      .then(
        (data) => {
          setIsProfilePhotoEmpty(false);
          setNeedToRefresh(true);
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
            id="photo" />
        </label>
        <h3>Шаг 3/3</h3>
        <MyLink size="14px" onClick={() => setStepNumber(2)} color={COLORS.DARK}><KeyboardBackspaceIcon/> На шаг 2/3</MyLink>
      </ProfilePhotoStyled>
  );
};

export default ProfilePhoto;
