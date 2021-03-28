import React, { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import {
  AddPhotoStyled, UserPhotoChange, UserPhotoRow, UserPhotosStyled,
} from './styled';
import axios from 'axios';
import { usersAPI } from '../../../api/api';

const AddPhoto = ({ photoId, setIsUpdated }) => {
  const uploadPhoto = (e, id) => {
    console.log("photoId123321:", id);
    const formData = new FormData();
    const file = e.target.files[0];

    console.log("photoId:", id);
    formData.append('content', file);
    formData.append('photoId', id);

    usersAPI.uploadProfilePhoto(formData)
      .then(
        (data) => {
          console.log("DATA upload photo:", data);
          setIsUpdated(true);
          // setIsProfilePhotoEmpty(false);
        },
        (err) => {
          console.log("ERR upload photo:", err);
        }
      )
      .catch(err => console.error("ERROR upload photo:", err));
  }

  return (
    <AddPhotoStyled htmlFor={`addPhoto${photoId}`}>
      <AddIcon style={{ width: 85, height: 85 }} />
      <input
        style={{ 'opacity': '0' }}
        type="file"
        onChange={(e) => uploadPhoto(e, photoId)}
        id={`addPhoto${photoId}`}
      />
    </AddPhotoStyled>
  );
}

const UserPhotos = () => {
  const [photos, setPhotos] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(false);

  useEffect(() => {
    usersAPI
      .getProfilePhotos()
      .then(
        ({ data }) => {
          console.log("arr:", data);
          setPhotos(data.Content.photos);

        },
        (err) => {
          console.log("ERROR Settings GetPhoto:", err)
        },
      )
      .catch((err) => console.log("ERROR:", err));
  }, [isUpdated]);

  return (
    <UserPhotosStyled>
      <UserPhotoRow>
        {photos[0] && photos[0].Content ?
          <UserPhotoChange src={ 'data:image/bmp;base64,' + photos[0].Content} /> :
          <AddPhoto setIsUpdated={setIsUpdated} photoId="0" />}

        {photos[1] && photos[1].Content ?
          <UserPhotoChange src={ 'data:image/bmp;base64,' + photos[1].Content} /> :
          <AddPhoto setIsUpdated={setIsUpdated} photoId="1" />}

        {photos[2] && photos[2].Content ?
          <UserPhotoChange src={ 'data:image/bmp;base64,' + photos[2].Content} /> :
          <AddPhoto setIsUpdated={setIsUpdated} photoId="2" />}

        {photos[3] && photos[3].Content ?
          <UserPhotoChange src={ 'data:image/bmp;base64,' + photos[3].Content} /> :
          <AddPhoto setIsUpdated={setIsUpdated} photoId="3" />}
      </UserPhotoRow>
    </UserPhotosStyled>
  );
}

export default UserPhotos;
