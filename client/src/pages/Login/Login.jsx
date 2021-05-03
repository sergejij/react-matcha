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
import {Redirect} from "react-router-dom";

export default ({setSocket, setMessageToMe, setNotificationToMe}) => {
  const portalRoot = document.getElementById('portal');
  const [isShownLoginForm, setIsShownLoginForm] = React.useState(false);
  const [isShownRegistrationForm, setIsShownRegistrationForm] = React.useState(false);
  const [amIAuth, setAmIAuth] = React.useState(false);
  const query = useQuery();

  React.useEffect(() => {
    if (localStorage.getItem('id')) {
      setAmIAuth(true);
    }
  });

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

  if (amIAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Landing>
      {
        isShownLoginForm && ReactDOM.createPortal(
          <Modal>
            <LoginForm
                setSocket={setSocket}
                onRegister={toggleRegistrationForm}
                onClose={toggleLoginForm}
                setMessageToMe={setMessageToMe}
                setNotificationToMe={setNotificationToMe}
            />
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
        <Button view="main" size={window.innerWidth > 400 ? "L" : "M"} onClick={toggleRegistrationForm}>Создать аккаунт</Button>
      </Content>
      <Footer>
        <Text>copyright © 2021. ubartemi - dbendu</Text>
      </Footer>
    </Landing>
  );
};
