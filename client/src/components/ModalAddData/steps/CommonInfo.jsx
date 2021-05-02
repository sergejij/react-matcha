import React from 'react';
import { userInfoApi, userInterestsApi, usersAPI } from '../../../api/api';
import { AddDataRow } from '../styled';
import Button from '../../Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Text } from '../../../styled';
import COLORS from '../../../constants';
import { Redirect } from 'react-router-dom';

const CommonInfo = ({ userData, setStepNumber, setIsRequiredEmpty }) => {
  const [post, setPost] = React.useState(userData.post);
  const [location, setLocation] = React.useState(userData.location);
  const [age, setAge] = React.useState(userData.age);
  const [sex, setSex] = React.useState(userData.sex);
  const [relationshipStatus, setRelationshipStatus] = React.useState(userData.relationshipStatus);
  const [sexPreference, setSexPreference] = React.useState(userData.sexPreference);
  const [attitudeToAlcohol, setAttitudeToAlcohol] = React.useState(userData.attitudeToAlcohol);
  const [attitudeToSmoking, setAttitudeToSmoking] = React.useState(userData.attitudeToSmoking);
  const [biography, setBiography] = React.useState(userData.biography);

  const [isRequiredNotFilled, setIsRequiredNotFilled] = React.useState(false);

  const [sexesList, setSexesList] = React.useState([]);
  const [relationshipsList, setRelationshipsList] = React.useState([]);
  const [attitudesList, setAttitudesList] = React.useState([]);

  const [amIAuthorized, setAmIAuthorized] = React.useState(true);

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
          }
        })
      .catch(err => console.error("ERROR getSexesList:", err))

    userInfoApi
      .getAttitudesList()
      .then(({ data }) => setAttitudesList(data.Content.attitudes))
      .catch(err => console.error("ERROR getSexesList:", err))

    userInfoApi
      .getRelationshipsList()
      .then(
        ({ data }) => setRelationshipsList(data.Content.relationshipsStatuses),
        (err) => {
          if (err.response.status === 401) {
            setAmIAuthorized(() => false);
          }
        })
      .catch(err => console.error("ERROR getRelationshipsList:", err))
  }, []);

  const sendInfo = () => {
    if (!age || !sex || !relationshipStatus || !sexPreference || !biography) {
      setIsRequiredNotFilled(true);
      return;
    }

    userInfoApi
      .postUserInfo({post, location, age, sex, relationshipStatus, sexPreference, attitudeToAlcohol, attitudeToSmoking, biography})
      .then((resp) => {
        setStepNumber(2);
        setIsRequiredEmpty(() => false);
      })
      .catch((err) => console.error("Response PUT ERROR:", err))
    setStepNumber(2);
  }

  if (!amIAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
      <>
        <h2>Добавьте информацию о себе</h2>
        <AddDataRow>
          <label htmlFor="post">
            Место работы
            <input onChange={(e) => setPost(e.target.value)} value={post} id="post" type="text"  />
          </label>

          <label htmlFor="location">
            Место жительства
            <input onChange={(e) => setLocation(e.target.value)} value={location} id="location" type="text" />
          </label>

          <label htmlFor="age">
            Возраст &#9913;
            <input onChange={(e) => setAge(e.target.value)} value={age}  id="age" type="number" />
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="sex">
            Пол &#9913;
            <select onChange={(e) => setSex(e.target.value)} value={sex} name="sex" id="sex" >
              {
                sexesList.map((name, index) =>
                  <option
                    value={name}
                    key={`${name}${index}`}
                  >
                    {name}
                  </option>)
              }
            </select>
          </label>

          <label htmlFor="relationshipStatus">
            Статус отношений &#9913;
            <select onChange={(e) => setRelationshipStatus(e.target.value)} value={relationshipStatus} name="relationshipStatus" id="relationshipStatus">
              {
                relationshipsList.map((name, index) =>
                  <option
                    value={name}
                    selected={name === relationshipStatus && "selected"}
                    key={`${name}${index}`}
                  >
                    {name}
                  </option>)
              }
            </select>
          </label>

          <label htmlFor="sexPreference">
            Сексульные предпочтения &#9913;
            <select onChange={(e) => setSexPreference(e.target.value)} value={sexPreference} name="sexPreference" id="sexPreference">
              {
                sexesList.map((name, index) =>
                  <option
                    value={name}
                    selected={name === sexPreference && "selected"}
                    key={`${name}${index}preference`}
                  >
                    {name}
                  </option>
                )
              }
            </select>
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="alcoholAttitude">
            Отношение к алкоголю
            <select onChange={(e) => setAttitudeToAlcohol(e.target.value)} value={attitudeToAlcohol} name="alcoholAttitude" id="alcoholAttitude">
              {
                attitudesList.map((name, index) =>
                  <option
                    value={name}
                    selected={name === attitudeToAlcohol && "selected"}
                    key={`${name}${index}alcoholAttitude`}
                  >
                    {name}
                  </option>)
              }
            </select>
          </label>

          <label htmlFor="smokingAttitude">
            Отношение к курению
           <select onChange={(e) => setAttitudeToSmoking(e.target.value)} value={attitudeToSmoking} name="smokingAttitude" id="smokingAttitude">
              {
                attitudesList.map((name, index) =>
                  <option
                    value={name}
                    selected={name === attitudeToSmoking && "selected"}
                    key={`${name}${index}smokingAttitude`}
                  >
                    {name}
                  </option>)
              }
            </select>
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="biography">
            О себе &#9913;
            <textarea
              onChange={(e) => setBiography(e.target.value)}
              value={biography}
              id="biography"
              cols="85"
            />
          </label>
        </AddDataRow>

        {isRequiredNotFilled && <Text color="red">Пожалуйста, заполните обязательные поля отмеченные звездочкой</Text>}

        <Button onClick={sendInfo} view="main" size="M" color="yellow">
          <Text color={COLORS.DARK}>Следующий шаг</Text>
          <ArrowRightAltIcon />
        </Button>
        <h3>Шаг 1/3</h3>
      </>
  );
};

export default CommonInfo;
