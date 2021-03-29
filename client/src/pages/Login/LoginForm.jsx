import React from 'react';
import { InputStyled, LoginFormStyled } from './styled';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../../styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { usersAPI } from '../../api/api';
import { Redirect } from 'react-router-dom';

export default ({ onClose, onRegister }) => {
  const [emailOrLogin, setEmailOrLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorNotification, setErrorNotification] = React.useState('');

  const [redirectTo, setRedirectTo] = React.useState('');

  const openRegister = (e) => {
    e.preventDefault();
    onClose();
    onRegister();
  };

  const onLogin = () => {
    if (!emailOrLogin || !password) {
      setErrorNotification("Заполните все поля формы.");
    } else {
      setErrorNotification("");
      usersAPI
        .login(emailOrLogin, password)
        .then(
          ({ data }) => {
            const id = data.Content.userId;
            localStorage.setItem('id', id)
            setRedirectTo(`/profile/${id}`);
          },
          (err) => {
            console.error("Err", err);
            setErrorNotification(err.response.status === 401 ? "Неверный логин или пароль." :
              "Произошла ошибка. Пожалуйста попробуйте снова.");
            console.log('err:', err.response);
          })
        .catch(err => console.error("Error login:", err));
    }
  }

  return (
    <>
    {redirectTo && <Redirect to={redirectTo} /> }
    <LoginFormStyled>
      <CloseIcon onClick={onClose} />
      <Text>
        Войдите в свой аккаунт или
        <a style={{ cursor: 'pointer', color: COLORS.DARK }} onClick={openRegister}> зарегистрируйтесь</a>
      </Text>
      <InputStyled
        type="email"
        value={emailOrLogin}
        name="email"
        onChange={(e) => setEmailOrLogin(e.target.value)}
        placeholder="Email"
      />
      <InputStyled
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      {errorNotification && <Text size={14} color="red">{errorNotification}</Text>}
      <Button onClick={onLogin} view="main">Войти</Button>
    </LoginFormStyled>
      </>
  );
};
