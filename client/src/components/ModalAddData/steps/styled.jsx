import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfilePhotoStyled = styled.div`
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
      //transform: rotateZ(-3deg);
      :hover {
        transition: .5s ease-in-out;
        transform: rotateZ(-360deg);
      }
    }
  }
`;
