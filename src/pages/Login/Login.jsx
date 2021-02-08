import React from 'react';

import {
  Landing, Header, Content, Footer, Headline,
} from './styled';
import COLORS from '../../constants';
import Button from '../../components/Button';
import Text from '../../styled';

export default () => (
  <Landing>
    <Header>
      <Text size="30px" color={COLORS.PINK}>FINDER</Text>
      <Button view="second" size="S">
        Войти
      </Button>
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
