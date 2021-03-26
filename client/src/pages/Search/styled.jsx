import styled from 'styled-components';
import COLORS from '../../constants';


export const FilterFormStyled = styled.div`
  position: absolute;
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 21%;
  top: 12%;
  background-color: white;
  opacity: 0.8;
  border-radius: 13px;
  padding: 5px;
  border: 1px solid ${COLORS.LIGHT_GRAY};
  
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

export const Modal = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
