import styled from 'styled-components';
import COLORS from '../../../constants';

export const ChatsAsideStyled = styled.div`
  width: 300px;
  height: 100vh;
  box-shadow: 0 0 4px 0px rgba(93, 83, 94, 0.32);
  background-color: ${COLORS.LIGHT_GRAY};
`;

export const ChatsAsideHeader = styled.div`
  background-color: ${COLORS.YELLOW};
  height: 8vh;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

export const ChatsAsideItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;
