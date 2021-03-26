import React from 'react';
import ReactDOM from 'react-dom';
import {
  Landing, Header, Content, Footer, Headline,
  Modal,
} from './styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import { Text } from '../../styled';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { useQuery } from '../../hooks';

export default () => {
  const portalRoot = document.getElementById('portal');
  const [isShownLoginForm, setIsShownLoginForm] = React.useState(false);
  const [isShownRegistrationForm, setIsShownRegistrationForm] = React.useState(false);
  const query = useQuery();

  React.useEffect(() => {
    if (query.get("openLogin")) {
      setIsShownLoginForm(true);
    }
  }, [])


  const toggleLoginForm = () => {
    setIsShownLoginForm((prevState) => !prevState);
  };

  const toggleRegistrationForm = () => {
    setIsShownRegistrationForm((prevState) => !prevState);
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
        <Text>copyright © 2021. ubartemi - dbendu</Text>
      </Footer>
    </Landing>
  );
};
