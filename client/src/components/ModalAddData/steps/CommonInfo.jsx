import React from 'react';
import { userInfoApi, usersAPI } from '../../../api/api';
import { AddDataRow } from '../styled';
import Button from '../../Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Text } from '../../../styled';
import COLORS from '../../../constants';

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

  const sendInfo = () => {
    if (!age || !sex || !relationshipStatus || !sexPreference || !biography) {
      setIsRequiredNotFilled(true);
      return;
    }
    userInfoApi
      .postUserInfo({post, location, age, sex, relationshipStatus, sexPreference, attitudeToAlcohol, attitudeToSmoking, biography})
      .then((resp) => {
        console.log("Response PUT:", resp);
        setStepNumber(2);
        setIsRequiredEmpty(() => false);
      })
      .catch((err) => console.error("Response PUT ERROR:", err))
    setStepNumber(2); // надо удалить
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
            <input onChange={(e) => setSex(e.target.value)} value={sex}  id="sex" type="text" />
          </label>

          <label htmlFor="relationshipStatus">
            Статус отношений &#9913;
            <input
              onChange={(e) => setRelationshipStatus(e.target.value)}
              value={relationshipStatus}
              id="relationshipStatus"
              type="text" />
          </label>

          <label htmlFor="sexPreference">
            Сексульные предпочтения &#9913;
            <input onChange={(e) => setSexPreference(e.target.value)} value={sexPreference}  id="sexPreference" type="text" />
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="alcoholAttitude">
            Отношение к алкоголю
            <input onChange={(e) => setAttitudeToAlcohol(e.target.value)} value={attitudeToAlcohol}  id="alcoholAttitude" type="text" />
          </label>

          <label htmlFor="smokingAttitude">
            Отношение к курению
            <input onChange={(e) => setAttitudeToSmoking(e.target.value)} value={attitudeToSmoking}  id="smokingAttitude" type="text" />
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
