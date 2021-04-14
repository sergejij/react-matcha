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
  gap: 70px;
`;

export const UserPhotoChange = styled.img`
  width: 250px;
  height: 349px;
  border-radius: 13px;
  transition: .2s ease-in-out;

  @media (max-width: 500px) {
    width: 200px;
    height: 280px;
  }
`;

export const UserPhotoBlock = styled.div`
  width: 250px;
  height: 400px;
  border-radius: 13px;
  border-bottom: 1px solid ${COLORS.YELLOW};

  @media (max-width: 500px) {
    width: 200px;
    height: 350px;
  }
`;

export const EditingBlock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  width: 250px;
  height: 51px;
  border-radius: 13px;
  
  & svg {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    width: 200px;
  }
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
  
  & svg, img {
    cursor: pointer;
    position: absolute;
    color: ${COLORS.GRAY};
  }
  
  &:hover {
    background-color: #f3f2f2;
  }

  @media (max-width: 500px) {
    width: 200px;
  }
`;
