import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import Profile from '../Profile/Profile';
import { FilterFormStyled } from './styled';

const FilterForm = () => {
  return (
    <FilterFormStyled>
      <h3>Фильтры по</h3>
      <p>местоположению</p>
      <p>рейтингу известности</p>
      <p>общим тегам</p>
    </FilterFormStyled>
  )
}
const Search = () => {
  const [users, setUsers] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [isShownFilterForm, setIsShownFilterForm] = React.useState(false);

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setUsers(data.users);
      });
  }, []);

  const toggleFilterForm = () => {
    setIsShownFilterForm(prevState => !prevState)
  }

  return (
    <Content>
      <Aside
        setCurrentUserId={setCurrentUserId}
        isSettings={false}
        isSearch
        onClickFilter={toggleFilterForm}
        headline="Поиск пары"
        users={users}
      />
      <Route path={`/search/${currentUserId}`}>
        <Profile identifier={currentUserId} />
      </Route>
      {
        isShownFilterForm &&
            <FilterForm />
      }
    </Content>
  );
};

export default Search;
