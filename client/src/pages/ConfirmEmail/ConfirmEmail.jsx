import React from 'react';
import { usersAPI } from '../../api/api';
import { Link } from 'react-router-dom';
import { Text } from '../../styled';
import { ConfirmEmailStyled } from './styled';
import Button from '../../components/Button';
import { useQuery } from '../../hooks';


export default () => {
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const query = useQuery();

  React.useEffect(() => {
    usersAPI.confirmEmail(query.get("code"))
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
      <div>
      {isConfirmed && <Text size="24px">Регистрация прошла успешна.</Text>}
      {isError && <Text size="24px">Не удалось подтвердить регистрацию.</Text>}
        <Link to={`/login${isConfirmed && '?openLogin=true'}`} size="L">
          <Button size="L">{isConfirmed ? 'Войти' : 'На страницу регистрации'}</Button>
        </Link>
      </div>
    </ConfirmEmailStyled>
  );
}
