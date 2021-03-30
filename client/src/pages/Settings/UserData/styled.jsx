import styled from 'styled-components';
import { darken } from 'polished';
import COLORS from '../../../constants';

export const SettingsPage = styled.div`
  width: calc(100% - 300px);
  margin: 3% auto 0;
`;

export const UserDataStyled = styled.div`
  width: 50%;
  margin: 3% auto 0;
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
`;

export const SettingsDataHeaderPhotoContainer = styled.div`
  position: relative;
  width: 200px;
  margin-right: 50px;
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
      
      @media screen and (max-width: 1700px) {
        width: 250px;
      }
      
      @media screen and (max-width: 1500px) {
        width: 200px;
      }
      
      @media screen and (max-width: 1300px) {
        width: 150px;
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
`;

export const ShareLocationStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  width: 100%;
  
  & label {
    margin-left: 20px;
    font-size: 18px;
    color: ${COLORS.DARK};
  }
`;
