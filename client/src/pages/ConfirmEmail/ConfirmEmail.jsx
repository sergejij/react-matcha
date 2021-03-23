import React from 'react';
import { usersAPI } from '../../api/api';
import { Link, useLocation } from 'react-router-dom';
import { Text } from '../../styled';
import { ConfirmEmailStyled } from './styled';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const query = useQuery();

  React.useEffect(() => {
    usersAPI.confirm(query.get("code"))
      .then(
        (data) => {
          console.log(data);
          setIsConfirmed(true);
        },
        (err) => {
          setIsError(true);
          console.error(err);
        })
      .catch(err => console.error(err));
  },[]);

  return (
    <ConfirmEmailStyled>
      {isConfirmed && <Text size="24px">Регистрация прошла успешна. <Link to="/login"> Вы можете войти на
        сайт.</Link></Text>}
      {isError && <Text size="24px">Не удалось подтвердить регистрацию.</Text>}
    </ConfirmEmailStyled>
  );
}
