import React from 'react';
import CreateIcon from '@material-ui/icons/Create';

import {
  ProfileInfoStyled,
  ProfileInfoBio,
  ProfileInfoPairs,
  ProfileInterest,
  ProfileInterestsStyled,
  UpdateField, UpdateBio, UpdateInterests, ShowBio,
} from './styled';
import { IconPencil } from '../../../styled';
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

const ProfileInfoField = ({list, fieldName, fieldKey, fieldValue}) => {
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
        <select name="select" onChange={(e) => setValue(e.target.value)}>
          {
            list.map((name, index) =>
              <option
                value={`${name}`}
                key={`${name}${index}`}
              >
                {name}
              </option>)

          }
        </select>
        <CheckCircleIcon onClick={changeInfoField} />
      </UpdateField>}
    </div>
  );
}

const ProfileInfo = ({ userData }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [interests, setInterests] = React.useState([]);
  const [bio, setBio] = React.useState(userData.biography);
  const [bioEditing, setBioEditing] = React.useState(false);
  const [interestsEditing, setInterestsEditing] = React.useState(false);

  const [sexesList, setSexesList] = React.useState([]);
  const [relationshipsList, setRelationshipsList] = React.useState([]);
  const [attitudesList, setAttitudesList] = React.useState([]);

  const changeBio = () => {
    setBioEditing(false);
    userInfoApi
      .changeBio(bio)
      .catch((err) => console.log("ERROR patchUserInfo bio:", err))
  }

  React.useEffect(() => {
    userInterestsApi
      .getInterests()
      .then(
        ({data}) => {
          const values = data.Content.interests;
          setInterests(values);
          console.log("INTERESTS:", values);
          setInputValue(values.join(" "));
        },
        (err) => console.error("ERROR getInterests:", err)
        )
      .catch((err) => console.error("ERROR getInterests:", err))

    userInfoApi
      .getSexesList()
      .then(({ data }) => setSexesList(data.Content.sexes))
      .catch(err => console.log("ERROR getSexesList:", err))

    userInfoApi
      .getAttitudesList()
      .then(({ data }) => setAttitudesList(data.Content.attitudes))
      .catch(err => console.log("ERROR getSexesList:", err))

    userInfoApi
      .getRelationshipsList()
      .then(({ data }) => setRelationshipsList(data.Content.relationshipsStatuses))
      .catch(err => console.log("ERROR getRelationshipsList:", err))
  }, []);

  const creatingInterests = (e) => {
    setInterestsEditing(false);
    setInputValue(e.target.value);
    setInterests(e.target.value.split(" ")
      .filter(item => item)
      .map(item => item[0] === '#' ? item.slice(1) : item));
  };

  const saveInterests = () => {
    setInterestsEditing(false);
    setInterests(inputValue.split(" ")
      .filter(item => item)
      .map(item => item[0] === '#' ? item.slice(1) : item));

    userInterestsApi
      .postInterests(interests)
      .then(
        (data) => {
          console.log(data);
        },
        (err) => console.error("ERROR createInterests:", err)
      )
      .catch((err) => console.error("ERROR createInterests:", err))
  };

  return(
    <>
      <ProfileInfoStyled>
        <ProfileInfoPairs>
          <ProfileInfoField
            list={sexesList}
            fieldName="Пол"
            fieldKey="sex"
            fieldValue={userData.sex}
          />
          <ProfileInfoField
            list={relationshipsList}
            fieldName="Статус отношений"
            fieldKey="relationshipStatus"
            fieldValue={userData.relationshipStatus}
          />
          <ProfileInfoField
            list={sexesList}
            fieldName="Сексуальное предпочтение"
            fieldKey="sexPreference"
            fieldValue={userData.sexPreference}
          />
          <ProfileInfoField
            list={attitudesList}
            fieldName="Отношение к алкоголю"
            fieldKey="attitudeToAlcohol"
            fieldValue={userData.attitudeToAlcohol}
          />
          <ProfileInfoField
            list={attitudesList}
            fieldName="Отношение к курению"
            fieldKey="attitudeToSmoking"
            fieldValue={userData.attitudeToSmoking}
          />
          <div>
            <p>Рейтинг:</p>
            <p>1234</p>
          </div>
        </ProfileInfoPairs>

        <ProfileInfoBio>
          {!bioEditing &&
          <>
            <p>
              {bio}
            </p>
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
        <IconPencil onClick={() => setInterestsEditing(true)} size="28px">
          <CreateIcon />
        </IconPencil>
      </h2>
      {interestsEditing &&
      <UpdateInterests>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите ваши интересы через пробел"
          value={inputValue}
        />
        <CheckCircleIcon onClick={saveInterests} />
      </UpdateInterests>}
      <ProfileInterests interests={interests} />
    </>
  );
}

export default ProfileInfo;
