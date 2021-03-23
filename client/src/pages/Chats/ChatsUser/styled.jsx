import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import COLORS from '../../../constants';

export const ChatsAsideItem = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 5px 8%;
  width: 100%;
  height: 8vh;
  text-decoration: none;
  color: black;

  transition: .2s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;
  
  &.active, &:hover {
    background-color: white;
  }
  
   &.active {
    box-shadow: 0 0 6px -1px rgba(93, 83, 94, 0.32);
  }
`;

export const ChatsAsidePhoto = styled.img`
  border-radius: 100%;
  width: 50px;
  height: 50px;
  text-align: center;
  box-shadow: 0 0 12px 2px rgba(93, 83, 94, 0.32);
  margin-right: 15px;
`;
