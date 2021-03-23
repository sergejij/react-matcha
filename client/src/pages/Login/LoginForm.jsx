import React from 'react';
import { InputStyled, LoginFormStyled, RegistrationFormStyled } from './styled';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../../styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { usersAPI } from '../../api/api';

export default ({ onClose, onRegister }) => {
  const [emailOrLogin, setEmailOrLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorNotification, setErrorNotification] = React.useState('');

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
          (data) => {
            console.log(data);
            console.log(document.cookie);
          },
          (err) => {
            setErrorNotification("Произошла ошибка. Пожалуйста попробуйте снова.");
            console.log(err);
          })
    }
  }

  return (
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
  );
};
