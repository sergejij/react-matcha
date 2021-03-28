import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfilePhotoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  & img {
    width: 100px;
    border-radius: 100px;
  }
  
  & label {
    display: flex;
    flex-direction: column;
    color: ${COLORS.DARK};
    transition: .5s ease-in-out;
    cursor: pointer;
    
    & svg:hover {
      transition: .5s ease-in-out;
      :hover {
        transition: .5s ease-in-out;
        transform: rotateZ(-360deg);
      }
    }
  }
`;

export const InterestsStepStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 75%;
  
  & input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(255,255,255,0.3);
    border-radius: 7px;
    outline: none;
    height: 40px;
    text-align: center;
    font-size: 16px;
    color: black;
  }
  
  &>div {
    display:flex;
    justify-content: center;
    max-height: 200px;
    overflow-y: scroll;
  }
  
  & button {
    margin-top: 50px;
    margin-bottom: 0;
  }
`;
