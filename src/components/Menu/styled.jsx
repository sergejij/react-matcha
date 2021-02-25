import styled from 'styled-components';
import { lighten } from 'polished';

import COLORS from '../../constants';

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

export const MenuIcon = styled.div`
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
