import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfileInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 5%;
  
`;

export const ProfileInfoPairs = styled.div`
  box-sizing: border-box;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  & div {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0;
    margin: 0;
  }
  
  & .info-value {
    color: ${COLORS.DARK};
    border-bottom: 1px dotted ${COLORS.DARK};
    cursor: pointer;
    padding-bottom: 28px;
    
    &:hover {
      border-color: black;
      color: black;
    }
  }
`;

export const ProfileInfoBio = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-between;

`;

export const ProfileInterestsStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em 3em;
`;

export const ProfileInterest = styled.div`
  display: inline-block;
  background-color: ${COLORS.GRAY};
  color: white;
  padding: 5px 25px;
  border-radius: 13px;
`;
