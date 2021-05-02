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

  const refresh = () => {
    setTimeout(() => window.location.reload(true));
  };

  return (
    <CartsStyled>
      {
        users.map((user, index) => {
          return (
              <Cart
                  to={`/profile/${user.Profile.Id}`}
                  img={'data:image/bmp;base64,' + user.Profile.Avatar}
                  key={`${user.Profile.Name}_${index}`}
                  onClick={refresh}
              >
                <div>
                  <Text color="white" size="18px">
                    {user.Profile.Name}
                  </Text>
                  <Button onClick={communicate} size="S" view="main">{buttonText}</Button>
                </div>
              </Cart>
          )
        })
      }
    </CartsStyled>
  );
};

export default UsersCarts;
