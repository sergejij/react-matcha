import React from 'react';
import { CartsStyled, Cart } from './styled';
import { Text } from '../../styled';

import zero from '../../assets/images/Profile/0.jpeg';
import Button from '../Button';

const UsersCarts = ({ users, buttonText }) => {
  const communicate = (e) => {
    e.preventDefault();
  };

  return (
    <CartsStyled>
      {
        users.map((user) => (
          <Cart to={`/profile/${user.id}`} img={zero}>
            <div>
              <Text color="white" size="18px">
                {user.name}
                {' '}
                {user.age}
              </Text>
              <Button onClick={communicate} size="S" view="main">{buttonText}</Button>
            </div>
          </Cart>
        ))
      }
    </CartsStyled>
  );
};

export default UsersCarts;
