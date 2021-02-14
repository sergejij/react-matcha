import React from 'react';
import ProfileImg from '../../../assets/images/Chats/liza.png';
import {
  ChatsAsideHeader, ChatsAsideItems, ChatsAsideStyled,
} from './styled';
import ChatsUser from '../ChatsUser/ChatsUser';

const users = ['Елизавета', 'Настя', 'Александра', 'Полина', 'Лана', 'Екатерина', 'Серафима', 'Анастасия', 'Даша'];

const ChatsAside = () => (
  <ChatsAsideStyled>
    <ChatsAsideHeader>
      <span>Чаты</span>
    </ChatsAsideHeader>
    <ChatsAsideItems>
      {
        users.map((user, index) => (
          <ChatsUser key={`${user}_${index}`} isActive={index === 0} name={user} img={ProfileImg} />))
      }
    </ChatsAsideItems>

  </ChatsAsideStyled>
);

export default ChatsAside;
