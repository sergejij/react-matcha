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
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [isShownFilterForm, setIsShownFilterForm] = React.useState(false);

  React.useEffect(() => {
    usersApi.getUsers(0, 20)
      .then(({ data }) => {
          console.log("GET USERS:", data);
          setUsers(data.Content.users);
      },
      (err) => {
          console.log("error:", err);
      })
        .catch(err => console.log("ERRRor:", err))

  }, []);

  const toggleFilterForm = () => {
    setIsShownFilterForm(prevState => !prevState)
  }

  const createUsers = () => {
      usersApi.createUsers(20)
          .then()
          .catch();
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
      <Button onClick={createUsers}>Create users</Button>
    </Content>
  );
};

export default Search;
