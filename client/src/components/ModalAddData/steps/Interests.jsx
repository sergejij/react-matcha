import React from 'react';
import Button from '../../Button';
import { MyLink, Text } from '../../../styled';
import COLORS from '../../../constants';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { InterestsStepStyled } from './styled';
import { ProfileInterests } from '../../../pages/Profile/ProfileInfo/ProfileInfo';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { userInterestsApi } from '../../../api/api';

const Interests = ({ setStepNumber }) => {
  const [interests, setInterests] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const creatingInterests = (e) => {
    setInputValue(e.target.value);
    setInterests(e.target.value.split(" ")
      .filter(item => item)
      .map(item => item[0] === '#' ? item.slice(1) : item));
  };

  const saveInterests = () => {
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

  const moveToNextStep = () => {
    saveInterests();
    setStepNumber(3);
  }

  return (
    <InterestsStepStyled>
      <h2>Добавьте свои интересы</h2>

      <input
        type="text"
        onChange={creatingInterests}
        placeholder="Введите ваши интересы через пробел"
        value={inputValue}
      />

      {interests.length !== 0 && <ProfileInterests className="add-info-interests" interests={interests} />}

      <Button onClick={moveToNextStep} view="main" size="M" color="yellow">
        <Text color={COLORS.DARK}>Следующий шаг</Text>
        <ArrowRightAltIcon />
      </Button>
      <h3>Шаг 2/3</h3>
      <MyLink size="14px" onClick={() => setStepNumber(1)} color={COLORS.DARK}><KeyboardBackspaceIcon/> На шаг 1/3</MyLink>
    </InterestsStepStyled>
  );
};

export default Interests;
