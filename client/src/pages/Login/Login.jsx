import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import {
  Landing, Header, Content, Footer, Headline,
  LoginFormStyled, Modal, RegistrationFormStyled, InputStyled,
} from './styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { Text } from '../../styled';

const LoginForm = ({ onClose, onRegister }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const register = (e) => {
    e.preventDefault();
    onClose();
    onRegister();
  };

  return (
    <LoginFormStyled>
      <CloseIcon onClick={onClose} />
      <Text>
        Войдите в свой аккаунт или
        <a style={{ cursor: 'pointer', color: COLORS.DARK }} onClick={register}> зарегистрируйтесь</a>
      </Text>
      <InputStyled
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <InputStyled
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <Button view="main">Войти</Button>
    </LoginFormStyled>
  );
};

const RegistrationForm = ({ onClose, onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = (e) => {
    e.preventDefault();
    onClose();
    onLogin();
  };

  return (
    <RegistrationFormStyled>
      <CloseIcon onClick={onClose} />
      <Text>
        Зарегистрируйтесь или
        <a style={{ cursor: 'pointer', color: COLORS.DARK }} onClick={login}> войдите в свой аккаунт</a>
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
        value={username}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
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
      <Button view="main">Регистрация</Button>
    </RegistrationFormStyled>
  );
};

export default () => {
  const portalRoot = document.getElementById('portal');
  const [isShownLoginForm, setIsShownLoginForm] = React.useState(false);
  const [isShownRegistrationForm, setIsShownRegistrationForm] = React.useState(false);

  const toggleLoginForm = () => {
    setIsShownLoginForm((prev) => !prev);
  };

  const toggleRegistrationForm = () => {
    setIsShownRegistrationForm((prev) => !prev);
  };

  return (
    <Landing>
      {
        isShownLoginForm && ReactDOM.createPortal(
          <Modal>
            <LoginForm onRegister={toggleRegistrationForm} onClose={toggleLoginForm} />
          </Modal>,
          portalRoot,
        )
      }
      {
        isShownRegistrationForm && ReactDOM.createPortal(
          <Modal>
            <RegistrationForm onLogin={toggleLoginForm} onClose={toggleRegistrationForm} />
          </Modal>,
          portalRoot,
        )
      }
      <Header>
        <Text size="30px" color={COLORS.PINK}>Matcha</Text>
        <Button view="second" size="S" onClick={toggleLoginForm}>Войти</Button>
      </Header>
      <Content>
        <Headline style={{ color: COLORS.PINK }}>Найди свою судьбу</Headline>
        <Button view="main" size="L" onClick={toggleRegistrationForm}>Создать аккаунт</Button>
      </Content>
      <Footer>
        <Text>copyright © 2021. ubartemi</Text>
      </Footer>
    </Landing>
  );
};