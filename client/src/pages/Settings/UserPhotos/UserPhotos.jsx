import React, { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BackupIcon from '@material-ui/icons/Backup';

import {
  AddPhotoStyled, EditingBlock, UserPhotoBlock, UserPhotoChange, UserPhotoRow, UserPhotosStyled,
} from './styled';
import {userPhotosApi} from '../../../api/api';
import { Redirect } from 'react-router-dom';

const AddPhoto = ({ srcImg, photoId, setIsUpdated }) => {
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  const uploadPhoto = (e, id) => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append('photo', file);
    formData.append('id', id);

      userPhotosApi.postPhotos(formData)
      .then(
        (data) => {
          setIsUpdated(true);
          window.location.reload(true);
        },
        (err) => {
          console.error("ERR upload photo:", err);
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        }
      )
      .catch(err => console.error("ERROR upload photo:", err));
  }

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return srcImg ? <UserPhoto srcImg={srcImg} photoId={photoId} uploadPhoto={uploadPhoto} />  : (
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

const UserPhoto = ({srcImg, uploadPhoto, photoId}) => {
    const deleteImg = () => {
        userPhotosApi
            .deletePhoto(photoId)
            .then(
                () => {
                    window.location.reload(true);
                },
                (err) => console.error('ERROR UserPhoto deleteImg:', err)
            )
            .catch((err) => console.error('ERROR UserPhoto deleteImg:', err))
    }
  return (
      <UserPhotoBlock>
        <UserPhotoChange src={srcImg} />
        <EditingBlock>
          <DeleteForeverIcon onClick={deleteImg} fontSize="large" color="error" />
          <label style={{ display: "inline"}} htmlFor={`addPhoto${photoId}`}>
            <BackupIcon fontSize="large" color="primary" />
          </label>
        </EditingBlock>
        <input
            style={{ 'opacity': '0' }}
            type="file"
            onChange={(e) => uploadPhoto(e, photoId)}
            id={`addPhoto${photoId}`}
        />
      </UserPhotoBlock>
  )
}

const UserPhotos = () => {
  const [photos, setPhotos] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  useEffect(() => {
      userPhotosApi
      .getPhotos()
      .then(
        ({ data }) => {
          setPhotos(data.Content.photos);
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR Settings GetPhoto:", err);
        },
      )
      .catch((err) => console.error("ERROR:", err));
  }, [isUpdated]);

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <UserPhotosStyled>
      <UserPhotoRow>
        <AddPhoto
            srcImg={(photos[0] && photos[0].Content) && ('data:image/bmp;base64,' + photos[0].Content)}
            setIsUpdated={setIsUpdated} photoId="0"
        />

        <AddPhoto
            srcImg={(photos[1] && photos[1].Content) && ('data:image/bmp;base64,' + photos[1].Content)}
            setIsUpdated={setIsUpdated} photoId="1"
        />

        <AddPhoto
            srcImg={(photos[2] && photos[2].Content) && ('data:image/bmp;base64,' + photos[2].Content)}
            setIsUpdated={setIsUpdated} photoId="2"
        />

        <AddPhoto
            srcImg={(photos[3] && photos[3].Content) && ('data:image/bmp;base64,' + photos[3].Content)}
            setIsUpdated={setIsUpdated} photoId="3"
        />
      </UserPhotoRow>
    </UserPhotosStyled>
  );
}

export default UserPhotos;
