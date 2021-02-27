import styled from 'styled-components';
import COLORS from '../../../../constants';

export const ChatMessagesStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  overflow-y: auto;
  height: 83vh;
  
  &::-webkit-scrollbar { 
    width: 0;
  }
`;

export const MessageStyled = styled.div`
  background-color: ${({ isMyMessage }) => (isMyMessage ? COLORS.PINK : COLORS.GRAY)};
  align-self: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
  padding: 3px 20px;
  border-radius: ${({ isMyMessage }) => (isMyMessage ? '50px 50px 0 50px' : '50px 50px 50px 0')};
  color: white;
  margin: 5px 0;
`;
