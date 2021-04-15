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

const ProfileInfoField = ({list, fieldName, fieldKey, fieldValue, isMyProfile}) => {
  const [value, setValue] = React.useState('');
  const [fieldEditing, setFieldEditing] = React.useState(false);
  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
      setValue(fieldValue);
  }, [])
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

  const onClickLabel = () => {
      if (isMyProfile) {
          setFieldEditing(true)
      }
  }

  return (
    <div>
      <p>{fieldName}:</p>
      {!fieldEditing && <label onClick={onClickLabel} className="info-value">{value}</label>}
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

const ProfileInfo = ({ userData, id, isMyProfile }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [interests, setInterests] = React.useState([]);
  const [bio, setBio] = React.useState('');
  const [bioEditing, setBioEditing] = React.useState(false);
  const [interestsEditing, setInterestsEditing] = React.useState(false);

  const [sexesList, setSexesList] = React.useState([]);
  const [relationshipsList, setRelationshipsList] = React.useState([]);
  const [attitudesList, setAttitudesList] = React.useState([]);

  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

  React.useEffect(() => {
      setBio(userData.biography);
  }, [userData]);

    React.useEffect(() => {
        userInterestsApi
            .getInterests(id)
            .then(
                ({data}) => {
                    const values = data.Content.interests;
                    setInterests(values);
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
    }, [userData]);



  React.useEffect(() => {
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
  }, [userData]);

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
        <ProfileInfoPairs isMyProfile={isMyProfile}>
          <ProfileInfoField
            list={sexesList}
            fieldName="Пол"
            fieldKey="patchSex"
            fieldValue={userData.sex}
            isMyProfile={isMyProfile}
          />
          <ProfileInfoField
            list={relationshipsList}
            fieldName="Статус отношений"
            fieldKey="patchRelationshipStatus"
            fieldValue={userData.relationshipStatus}
            isMyProfile={isMyProfile}
          />
          <ProfileInfoField
            list={sexesList}
            fieldName="Сексуальное предпочтение"
            fieldKey="patchSexPreference"
            fieldValue={userData.sexPreference}
            isMyProfile={isMyProfile}
          />
          <ProfileInfoField
            list={attitudesList}
            fieldName="Отношение к алкоголю"
            fieldKey="patchAttitudeToAlcohol"
            fieldValue={userData.attitudeToAlcohol}
            isMyProfile={isMyProfile}
          />
          <ProfileInfoField
            list={attitudesList}
            fieldName="Отношение к курению"
            fieldKey="patchAttitudeToSmoking"
            fieldValue={userData.attitudeToSmoking}
            isMyProfile={isMyProfile}
          />
          <div>
            <p>Рейтинг:</p>
            <p>{userData.rating}</p>
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
