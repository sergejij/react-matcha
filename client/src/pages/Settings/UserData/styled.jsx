import styled from 'styled-components';
import { darken } from 'polished';
import COLORS from '../../../constants';

export const SettingsPage = styled.div`
  width: calc(100% - 300px);
  margin: 3% auto 3%;
  overflow: hidden;
  @media (max-width: 900px) and (min-width: 100px){
    width: calc(100% - 50px);
    margin-right: 0;
  }
`;

export const SettingsDataHeaderBoxStyled = styled.div`
  width: 50%;
  margin: 3% auto 0;
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

  @media (max-width: 1600px) and (min-width: 1300px){
    h2 {
      font-size: 26px;
    }
  }

  @media (max-width: 1400px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 1300px) and (min-width: 1000px) {
    h2 {
      font-size: 22px;
    }
  }

  @media (max-width: 1000px) and (min-width: 500px) {
    h2 {
      font-size: 16px;
    }
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 14px;
    }
  }
`;

export const SettingsDataHeaderPhotoContainer = styled.div`
  position: relative;
  width: 200px;
  margin-right: 50px;

  @media (max-width: 1600px) and (min-width: 1400px){
      width: 150px;
  }

  @media (max-width: 1400px) and (min-width: 1000px) {
      width: 130px;
      margin-right: 0;
  }

  @media (max-width: 1000px) and (min-width: 500px) {
    width: 100px;
    margin-right: 0;
  }

  @media (max-width: 500px) {
    width: 90px;
    margin-right: 0;
  }
`;

export const SettingsDataHeaderPhotoImg = styled.img`
  border-radius: 100%;
  width: 100%;
  height: auto;
  text-align: center;
  box-shadow: 0 0 12px 2px rgba(93, 83, 94, 0.32);
  margin-right: 5%;
`;

export const SettingsDataHeaderPhotoEdit = styled.label`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 67%;
  left: 67%;
  
  border-radius: 100%;
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${COLORS.YELLOW};
  outline: none;
  transition: .2s ease-in-out;
  
  svg {
    color: ${COLORS.GRAY};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
    transition: .2s ease-in-out;
  }
  
  &:hover {
    svg {
      transition: .2s ease-in-out;
      color: ${darken(0.1, COLORS.GRAY)};
    }
    transition: .2s ease-in-out;
    background-color: ${darken(0.1, COLORS.YELLOW)};
  }
  
  &:active {
    svg {
      transition: .2s ease-in-out;
      color: ${darken(0.2, COLORS.GRAY)};
    }
    transition: .2s ease-in-out;
    background-color: ${darken(0.2, COLORS.YELLOW)};
  }

  @media (max-width: 1600px) and (min-width: 1400px){
    top: 62%;
    left: 62%;
    width: 35px;
    height: 35px;
    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 1400px) and (min-width: 1000px) {
    top: 60%;
    left: 60%;
    width: 30px;
    height: 30px;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 1000px) and (min-width: 500px) {
    top: 58%;
    left: 58%;
    width: 25px;
    height: 25px;
    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 500px) {
    top: 55%;
    left: 55%;
    width: 25px;
    height: 25px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const SettingsDataStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 3% auto 0;
`;

export const SettingsDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  width: 100%;
  
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
  
  & label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 16px;
  color: ${COLORS.GRAY};
    & input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: rgba(154, 158, 171, 0.1);
      border-radius: 13px;
      outline: none;
      width: 300px;
      height: 40px;
      text-align: center;
      font-size: 16px;
      color: black;
      
      @media (max-width: 1700px) and (min-width: 1500px) {
        width: 250px;
      }
      
      @media (max-width: 1500px) and (min-width: 1300px){
        width: 200px;
      }
      
      @media (max-width: 1300px) and (min-width: 1100px) {
        width: 150px;
      }
      
      @media (max-width: 1100px) and (min-width: 600px) {
        width: 300px;
      }

      @media (max-width: 600px) and (min-width: 450px) {
        width: 250px;
      }
      
      @media (max-width: 450px) and (min-width: 350px) {
        width: 200px;
      }
      
      @media (max-width: 350px) and (min-width: 50px) {
        width: 150px;
      }

      @media screen and (max-width: 1100px) {
        margin-bottom: 30px;
      }
    }
  }
`;

export const SettingsPasswords = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 170px;
  margin-top: 60px;

  @media (max-width: 1100px) {
    margin-bottom: 40px;
  }
`;

export const ShareLocationStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  width: 100%;
  
  & label {
    font-size: 18px;
    color: ${COLORS.DARK};
    padding-left: 10px;
    @media (max-width: 500px) and (min-width: 100px) {
      font-size: 14px;
    }
  }

  @media (max-width: 1100px) and (min-width: 100px) {
    margin-top: 0;
  }
  
`;
