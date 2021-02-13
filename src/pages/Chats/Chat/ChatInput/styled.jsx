import styled from 'styled-components';
import { lighten } from 'polished';
import COLORS from '../../../../constants';

export const ChatInputStyled = styled.div`
box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8.5vh;
  box-shadow: 0 -9px 9px -12px rgba(93, 83, 94, 0.32);
  overflow-y: auto;
  padding: 10px;
  
  &.red {
    width: 50%;
  }
`;

export const TA = styled.textarea`
  width: 80%;
  outline: none;
  resize: none;
  border: none;
  font-size: 16px;
  color: ${COLORS.DARK};
   line-height: 20px;

  &::placeholder {
   font-size: 16px;
   color: ${COLORS.GRAY};
  }
`;

export const SendIconStyled = styled.a`
  color: ${COLORS.PINK};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin: 20px;
  text-decoration:none;
  
  &:last-child {
    margin-top: auto;
  }
  
  svg {
    margin-bottom: 3px;
  }
  &.active {
    span, svg {
      transition: 0.2s ease-out;
      color: ${COLORS.PINK};
    }
  }
  
  &:hover:not(.active) {
    span, svg {
       color: ${lighten(0.05, COLORS.PINK)};
    }
  }
`;
