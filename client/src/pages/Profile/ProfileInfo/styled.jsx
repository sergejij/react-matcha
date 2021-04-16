import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfileInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 5%;

  @media (max-width: 1000px) and (min-width: 200px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const UpdateField = styled.div`
  position:absolute;
  right: -25px;
  
  & select {
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

export const UpdateInterests = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  & input {
    height: 40px;
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
  padding-bottom: 40px;
  
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  
  & .info-value {
    color: ${COLORS.DARK};
    border-bottom: ${(props) => (props.isMyProfile ? `1px dotted ${COLORS.DARK}` : 'none')};
    cursor: ${(props) => (props.isMyProfile ? 'pointer' : 'auto')};;
    
    &:hover {
      border-color: black;
      color: ${(props) => (props.isMyProfile ? 'black' : COLORS.DARK)};
    }
  }

  @media (max-width: 1200px) and (min-width: 700px) {
    width: 500px;
  }
  @media (max-width: 700px) and (min-width: 500px) {
    width: 300px;
    font-size: 15px;
    p {
      line-height: 20px;
    }
  }
  @media (max-width: 500px) and (min-width: 200px) {
    width: 200px;
    font-size: 13px;
    p {
      line-height: 16px;
    }
  }
`;

export const ProfileInfoBio = styled.div`
  width: 45%;
  font-size: 16px;
  & svg {
    margin-top: 8px;
  }
  
  p {
    display: inline;
    word-break: break-all;
    @media (max-width: 700px) and (min-width: 5px) {
      font-weight: 400;
    }
  }
  
  margin: 0 50px;

  @media (max-width: 1000px) and (min-width: 700px) {
    width: 500px;
  }
  @media (max-width: 700px) and (min-width: 500px) {
    width: 300px;
  }
  @media (max-width: 500px) and (min-width: 200px) {
    font-size: 15px;
    width: 200px;
  }
`;

export const ProfileInterestsStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em 3em;
  margin-bottom: 30px;

  @media (max-width: 500px) and (min-width: 200px) {
    font-size: 14px;
  }
`;

export const ProfileInterest = styled.div`
  display: inline-block;
  background-color: ${COLORS.GRAY};
  color: white;
  padding: 5px 25px;
  border-radius: 13px;
`;
