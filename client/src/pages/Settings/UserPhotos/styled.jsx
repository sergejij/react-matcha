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
  flex-wrap: wrap;
  gap: 30px;
`;

export const UserPhotoChange = styled.img`
  width: 250px;
  height: 349px;
  border-radius: 13px;
  transition: .2s ease-in-out;
`;

export const AddPhotoStyled = styled.label`
  position: relative;
  width: 250px;
  height: 349px;
  border-radius: 13px;
  border: 3px dotted ${COLORS.GRAY};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .2s ease-in-out;
  
  & svg {
    position: absolute;
    color: ${COLORS.GRAY};
  }
  
  &:hover {
    background-color: #f3f2f2;
  }
`;
