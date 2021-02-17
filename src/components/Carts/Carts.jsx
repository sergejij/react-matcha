import React from 'react';
import { CartsStyled, Cart } from './styled';
import { Text } from '../../styled';

import zero from '../../assets/images/Profile/0.jpeg';
import Button from '../Button';

const Carts = ({ users, buttonText }) => (
  <CartsStyled>
    {
        users.map((user) => (
          <Cart img={zero}>
            <div>
              <Text color="white" size="18px">
                {user.name}
                {' '}
                {user.age}
              </Text>
              <Button size="S" view="main">{buttonText}</Button>
            </div>
          </Cart>
        ))
      }
  </CartsStyled>
);

export default Carts;
