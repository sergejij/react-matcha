import React from 'react';
import { Route } from 'react-router-dom';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import Profile from '../Profile/Profile';
import { FilterFormStyled } from './styled';
import { usersApi } from '../../api/api';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const FilterForm = () => {
    const [selectedOption, setSelectedOption] = React.useState('');

    const radioChange = (e) => {
        setSelectedOption(e.currentTarget.value);
    }

    React.useEffect(() => {
        const Slider = document.getElementById('slider');
        console.log("SLIDER:", Slider);
        noUiSlider.create(Slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });

    }, []);



  return (
    <FilterFormStyled>
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
          <label htmlFor="commonTags">общим тегам</label>
          <input
              id="commonTags"
              type="radio"
              value="commonTags"
              checked={selectedOption === "commonTags"}
              onChange={radioChange}
          />
      </div>

      <div id="slider"/>
      <input type="submit" value="Выбрать"/>
    </FilterFormStyled>
  )
}
const Search = () => {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [isShownFilterForm, setIsShownFilterForm] = React.useState(false);

  React.useEffect(() => {
    usersApi.getUsers(0, 200)
      .then(({ data }) => {
          console.log("GET USERS:", data);
          setUsers(data.Content.users);
      },
      (err) => {
          console.log("error USERS Search:", err);
      })
        .catch(err => console.log("ERROR USERS Search:", err))

  }, []);

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
            <FilterForm />
      }
    </Content>
  );
};

export default Search;
