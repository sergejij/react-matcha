import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfileHeaderBox = styled.div`
  display: flex;
  justify-content: flex-start;
  
  & div > p {
    color: ${COLORS.DARK};
    
    b {
      font-weight: 600;
    }
    
    span {
      margin-left: 40px;
    }
  }
`;

export const ProfileHeaderPhoto = styled.img`
  border-radius: 100%;
  width: 200px;
  height: 200px;
  text-align: center;
  box-shadow: 0 0 12px 2px rgba(93, 83, 94, 0.32);
  margin-right: 5%;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10%;
  
  & :first-child {
    margin-right: 30px;
  }
`;
