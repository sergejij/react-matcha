import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfileInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 5%;
  
`;

export const UpdateField = styled.div`
  position:absolute;
  right: -25px;
  
  & input {
    height: 25px;
    width: 100px;
    border: 1px solid ${COLORS.GRAY};
    border-radius: 3px;
    outline-color: ${COLORS.PINK};
  }
  & svg {
    color: green;
    cursor: pointer;
  }
`

export const UpdateBio = styled.div`
  height: 100%;
  width: 100%;
  & textarea {
    height: 90%;
    width: 90%;
    border: 1px solid ${COLORS.GRAY};
    border-radius: 3px;
    resize: none;
    outline-color: ${COLORS.PINK};
  }
  & svg {
    color: green;
    cursor: pointer;
  }
`

export const ProfileInfoPairs = styled.div`
  position:relative;
  box-sizing: border-box;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  
  & .info-value {
    color: ${COLORS.DARK};
    border-bottom: 1px dotted ${COLORS.DARK};
    cursor: pointer;
    
    &:hover {
      border-color: black;
      color: black;
    }
  }
`;

export const ProfileInfoBio = styled.div`
  width: 45%;
  display: flex;
  & svg {
    margin-top: 8px;
  }
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
