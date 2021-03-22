import React from 'react';
import { usersAPI } from '../../api/api';
import { InputStyled, RegistrationFormStyled } from './styled';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../../styled';
import COLORS from '../../constants';
import Button from '../../components/Button';

export default ({ onClose, onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [formNotification, setFormNotification] = React.useState('');
  const [errorNotification, setErrorNotification] = React.useState('');

  const openLoginForm = (e) => {
    e.preventDefault();
    onClose();
    onLogin();
  };

  const onRegister = () => {
    if (!email || ! login || !name || !surname || !password) {
      setErrorNotification("Заполните все поля формы.");
    } else {
      setErrorNotification("");
      usersAPI
        .register(email, login, name, surname, password)
        .then(
          (resp) => {
            console.log(resp);
            if (resp.ErrorMessage) {
              setErrorNotification(resp.ErrorMessage);
            } else {
              setFormNotification("Регистрация прошла успешно. Для подтверждения email перейдите по ссылке в письме.");
            }
          },
          (err) => {
            setErrorNotification("Произошла ошибка. Пожалуйста попробуйте снова.");
            console.log(err);
          })
    }
  }

  return (
    <RegistrationFormStyled>
      <CloseIcon onClick={onClose} />
      <Text>
        Зарегистрируйтесь или
        <a style={{ cursor: 'pointer', color: COLORS.DARK }} onClick={openLoginForm}> войдите в свой аккаунт</a>
      </Text>
      <InputStyled
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <InputStyled
        type="text"
        value={login}
        name="username"
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Логин"
      />
      <InputStyled
        type="text"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
      />
      <InputStyled
        type="text"
        value={surname}
        name="surname"
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Фамилия"
      />
      <InputStyled
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      {errorNotification && <Text size={14} color="red">{errorNotification}</Text>}
      {formNotification && <Text size={14} color="green">{formNotification}</Text>}
      <Button onClick={onRegister} view="main">Регистрация</Button>
    </RegistrationFormStyled>
  );
};
