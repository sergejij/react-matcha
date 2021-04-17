import styled from 'styled-components';
import COLORS from '../../constants';


export const FilterFormStyled = styled.div`
  position: absolute;
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 21%;
  top: 12%;
  background-color: white;
  opacity: 0.9;
  border-radius: 13px;
  border: 1px solid ${COLORS.LIGHT_GRAY};
  padding: 20px;
  overflow: hidden;

  @media (max-width: 500px) and (min-width: 10px) {
    width: 200px;
  }
  @media (max-width: 400px) and (min-width: 10px) {
    width: 150px;
  }
  
  & .close {
    position: relative;
    right: 10%;
    top: 10%;
  }
  
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    &:nth-child(6) {
      margin-bottom: 80px;
    }
  }
  
  & div:last-child {
    & .noUi-connect {
      z-index: 0;
      background: ${COLORS.YELLOW};
    }
    
    & .noUi-origin {
      padding: 0;
      width: 0;
    }
  }
  
  & svg {
    position: absolute;
    top: 5%;
    right: 5%;
    transition: .2s ease-in-out;
    
    &:hover {
      color: ${COLORS.DARK};
      transition: .2s ease-in-out;
    }
  }
  & span {
    text-align: center;
    margin-bottom: 3%;
  }
  
  & input {
    margin-bottom: 5%;
    padding-left: 10px;
  }
  
  & button {
      margin-top: 3%;    
    }
`;
