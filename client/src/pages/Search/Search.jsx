import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import Profile from '../Profile/Profile';
import { FilterFormStyled } from './styled';
import {userInterestsApi, usersAPI, usersApi} from '../../api/api';
import CloseIcon from '@material-ui/icons/Close';

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

import Nouislider from 'react-nouislider';

const FilterForm = ({
    selectedOption,
    setSelectedOption,
    min,
    setMin,
    max,
    setMax,
    currentMin,
    setCurrentMin,
    currentMax,
    setCurrentMax,
    toggleFilterForm
}) => {
    React.useEffect(() => {
        setCurrentMin(min);
        setCurrentMax(max);
    }, [min, max]);
    const myId = localStorage.getItem('id');

    const changeValues = (values) => {
        setCurrentMin(Number(values[0]));
        setCurrentMax(Number(values[1]));
    }

    const radioChange = (e) => {
        setSelectedOption(e.currentTarget.value);
    }

    if (selectedOption === "remoteLocation") {

    } else if (selectedOption === "rating") {
        usersApi
            .getMaxRating()
            .then(
                ({data}) => setMax(data.Content.maxRating),
                (err) => console.error("ERROR getMaxRating:", err)
            )
            .catch((err) => console.error("ERROR getMaxRating:", err));
    } else if (selectedOption === "commonInterests") {
        userInterestsApi
            .getInterests(myId)
            .then(
                ({ data }) => setMax(data.Content.interests.length),
                (err) => console.error("ERROR getInterests:", err)
            )
            .catch((err) => console.error("ERROR getInterests:", err));
    } else if (selectedOption === "age") {
        usersApi
            .getMaxAge()
            .then(
                ({data}) => {
                    setMax(data.Content.maxAge)
                    setMin(0);
                },
                (err) => console.error("ERROR getMaxAge:", err)
            )
            .catch((err) => console.error("ERROR getMaxAge:", err));
    }

  return (
    <FilterFormStyled>
      <CloseIcon onClick={toggleFilterForm} color="error" />
      <h3>Сортировать по:</h3>

      <div>
          <label htmlFor="remoteLocation">удаленности</label>
          <input
              id="remoteLocation"
              type="radio"
              value="remoteLocation"
              checked={selectedOption === "remoteLocation"}
              onChange={radioChange}
          />
      </div>

      <div>
          <label htmlFor="rating">рейтингу</label>
          <input
              id="rating"
              type="radio"
              value="rating"
              checked={selectedOption === "rating"}
              onChange={radioChange}
          />
      </div>

      <div>
          <label htmlFor="commonInterests">общим интересам</label>
          <input
              id="commonInterests"
              type="radio"
              value="commonInterests"
              checked={selectedOption === "commonInterests"}
              onChange={radioChange}
          />
      </div>

      <div>
          <label htmlFor="age">возрасту</label>
          <input
              id="age"
              type="radio"
              value="age"
              checked={selectedOption === "age"}
              onChange={radioChange}
          />
      </div>

        <Nouislider
            range={{min, max}}
            start={[currentMin, currentMax]}
            step={1}
            connect
            tooltips
            onUpdate={changeValues}
        />

        <div>
            <span>min: {min}</span>
            <span>max: {max}</span>
        </div>
    </FilterFormStyled>
  )
}
const Search = () => {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [isShownFilterForm, setIsShownFilterForm] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState('id');
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(1);
  const [currentMin, setCurrentMin] = React.useState(0);
  const [currentMax, setCurrentMax] = React.useState(1);

  React.useEffect(() => {
    usersApi.getUsers(1, 200, selectedOption, currentMin, currentMax)
      .then(
          ({ data }) => setUsers(data.Content.users),
            (err) => console.log("error USERS Search:", err)
      )
        .catch(err => console.log("ERROR USERS Search:", err))

  }, [selectedOption, currentMin, currentMax]);

  const toggleFilterForm = () => {
    setIsShownFilterForm(prevState => !prevState)
  }

  return (
    <Content>
      <Aside
        isMobile={window.innerWidth < 900}
        setId={setId}
        isSearch
        onClickFilter={toggleFilterForm}
        headline="Поиск пары"
        users={users}
      />
      <Route path={`/search/${id}`}>
        <Profile userId={id} />
      </Route>
      {
        isShownFilterForm &&
            <FilterForm
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                min={min}
                setMin={setMin}
                max={max}
                setMax={setMax}
                currentMin={currentMin}
                setCurrentMin={setCurrentMin}
                currentMax={currentMax}
                setCurrentMax={setCurrentMax}
                toggleFilterForm={toggleFilterForm}
            />
      }
    </Content>
  );
};

export default Search;
