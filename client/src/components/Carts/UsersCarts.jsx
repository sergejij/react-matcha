import React from 'react';
import { CartsStyled, Cart } from './styled';
import { Text } from '../../styled';

import zero from '../../assets/images/Profile/0.jpeg';
import Button from '../Button';
import { ProfileInterest } from '../../pages/Profile/ProfileInfo/styled';

const UsersCarts = ({ users, buttonText }) => {
  const communicate = (e) => {
    e.preventDefault();
  };

  return (
    <CartsStyled>
      {
        users.map((user, index) => (
          <Cart
              to={`/profile/${user.Id}`}
              img={'data:image/bmp;base64,' + user.Avatar}
              key={`${user.Name}_${index}`}
          >
            <div>
              <Text color="white" size="18px">
                {user.Name}
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
