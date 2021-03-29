import React from 'react';
import CreateIcon from '@material-ui/icons/Create';

import {
  ProfileInfoStyled,
  ProfileInfoBio,
  ProfileInfoPairs,
  ProfileInterest,
  ProfileInterestsStyled,
  UpdateField, UpdateBio,
} from './styled';
import { IconPencil, Text } from '../../../styled';
import { userInfoApi, userInterestsApi } from '../../../api/api';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const ProfileInterests = ({ interests }) => (
    <ProfileInterestsStyled>
      {
        interests.map((interest, index) => (
          <ProfileInterest key={`${interest}_${index}`}>{`#${interest}`}</ProfileInterest>
          ))
      }
    </ProfileInterestsStyled>
);

const ProfileInfoField = ({fieldName, fieldKey, fieldValue}) => {
  const [value, setValue] = React.useState(fieldValue);
  const [fieldEditing, setFieldEditing] = React.useState(false);

  const changeInfoField = () => {
    setFieldEditing(false);
    userInfoApi
      .patchUserInfo(fieldKey, value)
      .then(
        () => {},
        (err) => console.log("ERROR patchUserInfo:", err)
        )
      .catch((err) => console.log("ERROR patchUserInfo:", err))
  }

  return (
    <div>
      <p>{fieldName}:</p>
      {!fieldEditing && <label onClick={() => setFieldEditing(true)} className="info-value">{value}</label>}
      {fieldEditing &&
      <UpdateField>
        <input onChange={(e) => setValue(e.target.value)} type="text" value={value}/>
        <CheckCircleIcon onClick={changeInfoField} />
      </UpdateField>}
    </div>
  );
}

const ProfileInfo = ({ userData }) => {
  const [interests, setInterests] = React.useState([]);
  const [bio, setBio] = React.useState(userData.biography);
  const [bioEditing, setBioEditing] = React.useState(false);

  const changeBio = () => {
    setBioEditing(false);
    userInfoApi
      .changeBio(bio)
      .then(
        () => {},
        (err) => console.log("ERROR patchUserInfo bio:", err)
      )
      .catch((err) => console.log("ERROR patchUserInfo bio:", err))
  }

  React.useEffect(() => {
    userInterestsApi
      .getInterests()
      .then(
        ({data}) => {
          setInterests(data.Content.interests);
        },
        (err) => console.error("ERROR getInterests:", err)
        )
      .catch((err) => console.error("ERROR getInterests:", err))
  }, []);

  return(
    <>
      <ProfileInfoStyled>
        <ProfileInfoPairs>
          <ProfileInfoField fieldName="Пол" fieldKey="sex" fieldValue={userData.sex} />
          <ProfileInfoField fieldName="Статус отношений" fieldKey="relationshipStatus" fieldValue={userData.relationshipStatus} />
          <ProfileInfoField fieldName="Сексуальное предпочтение" fieldKey="sexPreference" fieldValue={userData.sexPreference} />
          {userData.sexPreference &&
            <ProfileInfoField fieldName="Отношение к алкоголю" fieldKey="attitudeToAlcohol" fieldValue={userData.attitudeToAlcohol} />}
          {userData.sexPreference &&
            <ProfileInfoField fieldName="Отношение к курению" fieldKey="attitudeToSmoking" fieldValue={userData.attitudeToSmoking} />}
          <div>
            <p>Рейтинг:</p>
            <p>1234</p>
          </div>
        </ProfileInfoPairs>



        <ProfileInfoBio>
          {!bioEditing &&
          <>
          <div className="flex">
            {bio}
          </div>
          <IconPencil onClick={() => setBioEditing(true)} size="18px">
            <CreateIcon />
          </IconPencil>
          </>}

          {bioEditing &&
          <UpdateBio>
            <textarea onChange={(e) => setBio(e.target.value)}>
              {bio}
            </textarea>
            <CheckCircleIcon onClick={changeBio} />
          </UpdateBio>}
        </ProfileInfoBio>


      </ProfileInfoStyled>



      <h2>
        Интересы:
        <IconPencil size="28px">
          <CreateIcon />
        </IconPencil>
      </h2>
      <ProfileInterests interests={interests} />
    </>
  );
}

export default ProfileInfo;
