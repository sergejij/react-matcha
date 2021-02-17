import styled from 'styled-components';
import COLORS from '../../../constants';

const AsideItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 5px 8%;
  width: 100%;
  height: 8vh;

  transition: .2s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;
  
  svg {
    margin-right: 20px;
  }
  &.active, &:hover {
    background-color: white;
  }
  
   &.active {
    border-right: 8px solid ${COLORS.YELLOW};
    box-shadow: 0 0 6px -1px rgba(93, 83, 94, 0.32);
  }
`;

export default AsideItem;
