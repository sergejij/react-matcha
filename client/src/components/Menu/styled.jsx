import styled from 'styled-components';
import { lighten } from 'polished';

import { NavLink } from 'react-router-dom';
import COLORS from '../../constants';
import React from "react";

export const BoxMenu = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.DARK};
  position: sticky;
  height: 100vh;
  width: 130px;
  top: 0;
`;

export const MobileMenuStyled = styled.div`
  position: absolute;
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.DARK};
  height: 100vh;
  width: 100%;
  top: 0;
`;

export const MenuIconLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin: 20px;
  text-decoration:none;
  color: ${COLORS.GRAY};
  
  &:last-child {
    margin-top: auto;
  }
  
  svg {
    margin-bottom: 3px;
  }
  &.active {
    span, svg {
      transition: 0.2s ease-out;
      color: ${COLORS.YELLOW};
    }
  }
  
  &:hover:not(.active) {
    span, svg {
       color: ${lighten(0.20, COLORS.GRAY)};
    }
  }
`;

export const MobileMenuLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin: 20px;
  text-decoration:none;
  color: ${COLORS.GRAY};
  
  &:last-child {
    margin-top: auto;
  }
  
  & svg {
    margin-bottom: 3px;
  }
  &.active {
    span, svg {
      transition: 0.2s ease-out;
      color: ${COLORS.YELLOW};
    }
  }
  
  &:hover:not(.active) {
    span, svg {
       color: ${lighten(0.20, COLORS.GRAY)};
    }
  }
`;

export const BurgerStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid ${COLORS.PINK};
  height: 40px;
  width: 40px;
  left: 20px;
  top: 20px;
  transition: .2s ease-in-out;
  z-index: 999;
  
  svg {
    color: ${COLORS.PINK};
  }
  
  &:hover {
    background: ${COLORS.PINK};
    svg {
      color: white;
    }
  }
`;

export const MobileMenuClose = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  left: 20px;
  top: 20px;
  transition: .2s ease-in-out;

  &:hover {
    svg {
      color: #f65d26;
    }
  }
`;

export const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
`;
