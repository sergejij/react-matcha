import styled from 'styled-components';
import COLORS from '../../../constants';

export const ProfileHeaderBox = styled.div`
  display: flex;
  flex-wrap: ${(props) => props.isNeedWrap ? 'wrap' : 'none'};
  justify-content: ${(props) => props.isNeedWrap ? 'center' : 'flex-start'};
  
  & div > p {
    color: ${COLORS.DARK};
    
    b {
      font-weight: 600;
    }
    
    span {
      margin-left: 40px;
    }
  }

  @media (max-width: 1400px) and (min-width: 1100px){
    img {
      width: 170px;
      height: 170px;
    }
    h2 {
      font-size: 30px;
    }
  }

  @media (max-width: 1100px) and (min-width: 1000px) {
    img {
      width: 150px;
      height: 150px;
    }
    h2 {
      font-size: 25px;
    }
  }
  @media (max-width: 1000px) and (min-width: 600px) {
    img {
      width: 130px;
      height: 130px;
    }
    h2 {
      font-size: 20px;
    }
  }
  
  @media (max-width: 600px) and (min-width: 500px) {
    img {
      width: 110px;
      height: 110px;
    }
    h2 {
      font-size: 16px;
    }
  }
  
  @media (max-width: 500px) {
    img {
      width: 90px;
      height: 90px;
    }
    h2 {
      font-size: 14px;
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
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10%;
  align-items: center;
  width: 100px;
`;
