import styled from 'styled-components';

export const CartsStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3vw;
  padding: 5% 10%;
`;

export const Cart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%), url(${(props) => props.img}) center center no-repeat;
  background-size: 100%; 
  border-radius: 13px;
  width: 300px;
  height: 300px;
  margin-bottom: 3%; 
  transition: .5s ease-in-out;
  
  & div {
    display: flex;
    flex-direction: column;
    align-self: center;
    text-align: center;
    margin-bottom: 10%;
  }
  
  &:hover {
    background: linear-gradient(0deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url(${(props) => props.img}) center center no-repeat;
    background-size: 110%;
    transition: .5s ease-in-out;
  }
  
  @media (max-width: 950px) and (min-width: 800px) {
    width:  250px;
    height: 250px;
  }
  
  @media (max-width: 800px) and (min-width: 700px) {
    width: 200px;
    height: 200px;
  }
`;
