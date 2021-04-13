import styled from 'styled-components';
import COLORS from '../../../constants';

export const SessionBlockStyled = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  margin-bottom: 20px;
  
  & svg {
    margin: 40px;
    color: ${COLORS.DARK};
  }
  
  & .close {
    margin-left: auto;
    cursor:pointer;
    color: red;
  }

  @media (max-width: 1100px) and (min-width: 600px) {
    width: 400px;
  }
  
  @media (max-width: 600px) and (min-width: 100px) {
    width: 300px;
  }
  
  transition: .2s ease-in-out;
  
  -webkit-box-shadow: 0px 0px 11px -7px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 11px -7px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 11px -7px rgba(0, 0, 0, 0.1);

  &:hover {
    -webkit-box-shadow: 0px 0px 25px -7px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 25px -7px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 25px -7px rgba(0, 0, 0, 0.1);
  }
`;


