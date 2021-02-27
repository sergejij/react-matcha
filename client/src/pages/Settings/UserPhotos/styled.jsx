import styled from 'styled-components';
import COLORS from '../../../constants';

export const UserPhotosStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3vw;
  margin: 30px 0;
`;

export const UserPhotoRow = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
`;

export const UserPhotoChange = styled.img`
  width: 250px;
  height: 349px;
  border-radius: 13px;
  transition: .2s ease-in-out;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;  
  }
`;

export const AddPhotoStyled = styled.div`
  position: relative;
  width: 250px;
  height: 349px;
  border-radius: 13px;
  border: 3px dotted ${COLORS.GRAY};
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .2s ease-in-out;
  
  & svg {
    position: absolute;
    visibility: ${(props) => props.hasImg && 'hidden'};
    color: ${COLORS.GRAY};
  }
  
  &:hover {
    & svg {
      visibility: visible;
    }
    background-color: #eeeeee;
  }
`;
