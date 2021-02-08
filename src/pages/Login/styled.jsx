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
  height: 10vh;
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
