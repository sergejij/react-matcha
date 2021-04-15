import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Content } from '../../styled';
import Aside from '../../components/Aside/Aside';
import Profile from '../Profile/Profile';
import { FilterFormStyled } from './styled';
import { usersApi } from '../../api/api';
import Button from "../../components/Button";

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
  const [id, setId] = React.useState(null);
  const [isShownFilterForm, setIsShownFilterForm] = React.useState(false);

  React.useEffect(() => {
    usersApi.getUsers(0, 200)
      .then(({ data }) => {
          console.log("GET USERS:", data);
          setUsers(data.Content.users);
      },
      (err) => {
          console.log("errorU SERS Search:", err);
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
