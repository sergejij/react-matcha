import React from 'react';
import { InputStyled, LoginFormStyled } from './styled';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../../styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { userInfoApi, usersAPI } from '../../api/api';
import { Redirect } from 'react-router-dom';

export default ({ onClose, onRegister }) => {
  const [emailOrLogin, setEmailOrLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorNotification, setErrorNotification] = React.useState('');

  const [redirectTo, setRedirectTo] = React.useState('');

  let intervalId;

  const openRegister = (e) => {
    e.preventDefault();
    onClose();
    onRegister();
  };

  // function sendGeoPosition(position) {
  //   const {latitude, longitude} = position.coords;
  //
  //   userInfoApi
  //     .sendLocation(latitude, longitude)
  //     .then(
  //       () => {
  //         console.log("Good");
  //       },
  //       (err) => {
  //         if (err.response.status === 401) {
  //           clearInterval(intervalId);
  //         }
  //       }
  //     )
  //     .catch((err) => console.error("ERROR sendLocation:", err));
  // }
  //
  // function sendErrGeoPosition() {
  //   clearInterval(intervalId);
  // }

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
            localStorage.setItem('id', id);
            // intervalId = setInterval(() => {
            //   navigator.geolocation.getCurrentPosition(
            //     sendGeoPosition,
            //     sendErrGeoPosition, {
            //       enableHighAccuracy: true,
            //     })
            // }, 500000);
            setRedirectTo(`/profile/${id}`);
          },
          (err) => {
            console.error("ERROR login:", err.response.status);
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
