import styled from 'styled-components';
import COLORS from '../../../../constants';

export const ChatInputStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8.5vh;
  box-shadow: 0 -9px 9px -12px rgba(93, 83, 94, 0.32);
`;

export const TA = styled.textarea`
  overflow-y: auto;
  
  width: 80%;
  outline: none;
  resize: none;
  border: none;
  font-size: 16px;
  color: ${COLORS.DARK};
  line-height: 20px;

  &::-webkit-scrollbar { 
    width: 0;
  }
  
  &::placeholder {
   font-size: 16px;
   color: ${COLORS.GRAY};
  }

  @media (max-width: 600px) and (min-width: 10px){
    font-size: 14px;
    &::placeholder {
      font-size: 14px;
    }
  }
`;

export const SendIconStyled = styled.a`
  color: ${COLORS.PINK};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  text-decoration:none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`;
