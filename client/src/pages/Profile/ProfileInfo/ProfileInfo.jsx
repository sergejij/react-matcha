import React from 'react';
import CreateIcon from '@material-ui/icons/Create';

import {
  ProfileInfoStyled,
  ProfileInfoBio,
  ProfileInfoPairs,
  ProfileInterest,
  ProfileInterestsStyled,
  UpdateField, UpdateBio, UpdateInterests,
} from './styled';
import { IconPencil } from '../../../styled';
import { userInfoApi, userInterestsApi } from '../../../api/api';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Redirect } from 'react-router-dom';

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
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  const changeInfoField = () => {
    setFieldEditing(false);

    userInfoApi[fieldKey](value)
      .then(
        () => {},
        (err) => {
          console.log("ERROR patchUserInfo:", err);
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        }
        )
      .catch((err) => console.log("ERROR patchUserInfo:", err))
  }

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
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
                value={name}
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

  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  const changeBio = () => {
    setBioEditing(false);
    userInfoApi
      .changeBio(bio)
      .then(
        () => {},
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        }
      )
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
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR getInterests:", err)
        }
        )
      .catch((err) => console.error("ERROR getInterests:", err))

    userInfoApi
      .getSexesList()
      .then(
        ({ data }) => {
          setSexesList(data.Content.sexes)
        },
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        })
      .catch(err => console.log("ERROR getSexesList:", err))

    userInfoApi
      .getAttitudesList()
      .then(({ data }) => setAttitudesList(data.Content.attitudes))
      .catch(err => console.log("ERROR getSexesList:", err))

    userInfoApi
      .getRelationshipsList()
      .then(
        ({ data }) => setRelationshipsList(data.Content.relationshipsStatuses),
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
        })
      .catch(err => console.log("ERROR getRelationshipsList:", err))
  }, []);

  const saveInterests = () => {
    setInterestsEditing(false);
    const newInterests = inputValue.split(" ")
      .filter(item => item)
      .map(item => item[0] === '#' ? item.slice(1) : item);
    setInterests(newInterests);

    userInterestsApi
      .postInterests(newInterests)
      .then(
        () => {},
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
            localStorage.clear();
          }
          console.error("ERROR createInterests:", err)
        }
      )
      .catch((err) => console.error("ERROR createInterests:", err))
  };

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return(
    <>
      <ProfileInfoStyled>
        <ProfileInfoPairs>
          <ProfileInfoField
            list={sexesList}
            fieldName="Пол"
            fieldKey="patchSex"
            fieldValue={userData.sex}
          />
          <ProfileInfoField
            list={relationshipsList}
            fieldName="Статус отношений"
            fieldKey="patchRelationshipStatus"
            fieldValue={userData.relationshipStatus}
          />
          <ProfileInfoField
            list={sexesList}
            fieldName="Сексуальное предпочтение"
            fieldKey="patchSexPreference"
            fieldValue={userData.sexPreference}
          />
          <ProfileInfoField
            list={attitudesList}
            fieldName="Отношение к алкоголю"
            fieldKey="patchAttitudeToAlcohol"
            fieldValue={userData.attitudeToAlcohol}
          />
          <ProfileInfoField
            list={attitudesList}
            fieldName="Отношение к курению"
            fieldKey="patchAttitudeToSmoking"
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
