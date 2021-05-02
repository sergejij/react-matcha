import styled from 'styled-components';
import COLORS from '../../constants';

export const ChatsAsideStyled = styled.div`
  width: 300px;
  position: sticky;
  box-shadow: 0 0 4px 0 rgba(93, 83, 94, 0.32);
  background-color: ${COLORS.LIGHT_GRAY};
  top: 0;
  height: 100vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 0;
  }
  
  @media (max-width: 900px) {
    position: fixed;
    width: 50px;
    padding-top: 30px;
  }
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
  margin-top: ${(props) => !props.isSearch && '50px'};
`;

export const FilterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px 10px 0;

  @media (max-width: 900px) and (min-width: 10px) {
    padding: 25px 5px 10px 0;
    margin-top: 30px;
  }
`;
