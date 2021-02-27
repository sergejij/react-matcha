import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import first from '../../../assets/images/Profile/1.jpg';
import second from '../../../assets/images/Profile/2.jpg';
import third from '../../../assets/images/Profile/3.jpg';
import fourth from '../../../assets/images/Profile/4.jpg';
import {
  AddPhotoStyled, UserPhotoChange, UserPhotoRow, UserPhotosStyled,
} from './styled';

const AddPhoto = ({ children, hasImg }) => (
  <AddPhotoStyled hasImg={hasImg}>
    {children}
    <AddIcon style={{ width: 85, height: 85 }} />
  </AddPhotoStyled>
);

const UserPhotos = () => (
  <UserPhotosStyled>
    <UserPhotoRow>
      {first ? <UserPhotoChange src={first} /> : <AddPhoto />}
      {second ? <UserPhotoChange src={second} /> : <AddPhoto />}
    </UserPhotoRow>
    <UserPhotoRow>
      {third ? <UserPhotoChange src={third} /> : <AddPhoto />}
      {null ? <UserPhotoChange src={fourth} /> : <AddPhoto />}
    </UserPhotoRow>
  </UserPhotosStyled>
);

export default UserPhotos;
