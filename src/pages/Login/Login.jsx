import React from 'react';
import ReactDOM from 'react-dom';

import {
  Landing, Header, Content, Footer, Headline, LoginStyled, Modal,
} from './styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { Text } from '../../styled';
import { MenuIcon } from '../../components/Menu/styled';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <LoginStyled>
      <Text>
        Войдите в свой аккаунт или
        <i>зарегистрируйтесь</i>
      </Text>
      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
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
  return (
    <Landing>
      {
        isShownLoginForm && ReactDOM.createPortal(
          <Modal><Login /></Modal>,
          portalRoot,
        )
      }
      <Header>
        <Text size="30px" color={COLORS.PINK}>Matcha</Text>
        <MenuIcon activeClassName="active">
          <Button view="second" size="S" onClick={() => setIsShownLoginForm((prev) => !prev)}>Войти</Button>
        </MenuIcon>
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
