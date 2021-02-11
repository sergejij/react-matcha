import styled from 'styled-components';

import { Tab, TabList } from 'react-tabs';
import COLORS from '../../../constants';

export const ProfileTabsStyled = styled(TabList)`
  display:flex;
  justify-content: space-evenly;
  margin-top: 5%;
`;

export const ProfileTabsLink = styled(Tab)`
  color: black;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  list-style: none;
  
  &.active:after {
    width: 100%;
  }
  
  &:after {
    display: block;
    content: "";
    background-color: ${COLORS.PINK};
    height: 3px;
    width: 0;
    left: 50%;
    margin-top: 10px;
    position: absolute;
    -webkit-transition: width .3s ease-in-out;
    -moz--transition: width .3s ease-in-out;
    transition: width .3s ease-in-out;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  
  &:hover:after, &:focus:after {
    width: 100%;
  }
`;
