import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import {
  Landing, Header, Content, Footer, Headline, LoginStyled, Modal,
} from './styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { Text } from '../../styled';
import Input from '../../components/Input/Input';

const Login = ({ onClose }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <LoginStyled>
      <CloseIcon onClick={onClose} />
      <Text>
        Войдите в свой аккаунт или
        <i>зарегистрируйтесь</i>
      </Text>
      <Input
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button view="main">Войти</Button>
    </LoginStyled>
  );
};

export default () => {
  const portalRoot = document.getElementById('portal');
  const [isShownLoginForm, setIsShownLoginForm] = React.useState(false);
  // const [isShownRegistration, setIsShownRegistration] = React.useState(false);

  // if (isShownLogin) {
  //   modalRoot.appendChild(Login);
  // }
  const toggleLoginForm = () => {
    setIsShownLoginForm((prev) => !prev);
  };

  return (
    <Landing>
      {
        isShownLoginForm && ReactDOM.createPortal(
          <Modal><Login onClose={toggleLoginForm} /></Modal>,
          portalRoot,
        )
      }
      <Header>
        <Text size="30px" color={COLORS.PINK}>Matcha</Text>
        <Button view="second" size="S" onClick={toggleLoginForm}>Войти</Button>
      </Header>
      <Content>
        <Headline style={{ color: COLORS.PINK }}>Найди свою судьбу</Headline>
        <Button view="main" size="L">Создать аккаунт</Button>
      </Content>
      <Footer>
        <Text>copyright © 2021. ubartemi</Text>
      </Footer>
    </Landing>
  );
};
