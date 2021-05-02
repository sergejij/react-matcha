import React from 'react';
import { CartsStyled, Cart } from './styled';
import { Text } from '../../styled';

import zero from '../../assets/images/Profile/0.jpeg';
import Button from '../Button';
import { ProfileInterest } from '../../pages/Profile/ProfileInfo/styled';
import {NavLink} from "react-router-dom";

const UsersCarts = ({ users, buttonText }) => {
  const communicate = (e, userId) => {
    e.stopPropagation();
    e.preventDefault();
    window.location = `http://localhost:3000/${buttonText === "Общаться" ? "chats" : "profile"}/${userId}`;
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
                  to={`/profile/${user.Id}`}
                  img={'data:image/bmp;base64,' + user.Avatar}
                  key={`${user.Name}_${index}`}
                  onClick={refresh}
              >
                <div>
                  <Text color="white" size="18px">
                    {user.Name}
                  </Text>
                  {/*<NavLink to={`${buttonText === "Общаться" ? "chats" : "profile"}/${user.Profile.Id}`}>*/}
                  <Button onClick={(e) => communicate(e, user.Id)} size="S" view="main">{buttonText}</Button>
                  {/*</NavLink>*/}
                </div>
              </Cart>
          )
        })
      }
    </CartsStyled>
  );
};

export default UsersCarts;
