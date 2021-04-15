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
  // const [users, setUsers] = React.useState([]);
  const [users1, setUsers1] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [isShownFilterForm, setIsShownFilterForm] = React.useState(false);

  React.useEffect(() => {
    usersApi.getUsers(0, 20)
      .then(({ data }) => {
          console.log("GET USERS:", data);
          setUsers1(data.Content.users);
      },
      (err) => {
          console.log("error:", err);
      })
        .catch(err => console.log("ERROR:", err))

  }, []);
    // React.useEffect(() => {
    //     axios.get('http://localhost:3000/db.json')
    //         .then(({ data }) => {
    //             setUsers(data.users);
    //         });
    // }, []);

  const toggleFilterForm = () => {
    setIsShownFilterForm(prevState => !prevState)
  }

  // console.log("USERS:", users);
  console.log("USERS1:", users1);

  return (
    <Content>
      <Aside
        isMobile={window.innerWidth < 900}
        setCurrentUserId={setCurrentUserId}
        isSearch
        onClickFilter={toggleFilterForm}
        headline="Поиск пары"
        users={users1}
      />
      <Route path={`/search/${currentUserId}`}>
        <Profile userId={currentUserId} />
      </Route>
      {
        isShownFilterForm &&
            <FilterForm />
      }
    </Content>
  );
};

export default Search;
