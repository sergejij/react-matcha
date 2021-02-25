import styled from 'styled-components';
import LandingImage from '../../assets/images/landing-screen.jpg';
import COLORS from '../../constants';

export const Landing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url(${LandingImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  width: 100vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  width: 100vw;
  color: ${COLORS.YELLOW}
`;

export const Headline = styled.h1`
  font-size: 5em;
  margin-bottom: 90px;
`;

export const Modal = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const LoginStyled = styled.div`
  position: absolute;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -200px;
  background-color: ${COLORS.LIGHT_GRAY};
  border-radius: 13px;
  
  & span {
    text-align: center;
    margin-bottom: 10%;
  }
  
  & input {
    background: aliceblue;
    margin-bottom: 5%;
    
  }
  & button {
      margin-top: 10%;    
    }
`;
