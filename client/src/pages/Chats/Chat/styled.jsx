import styled from 'styled-components';

export const ChatStyled = styled.div`
  width: calc(100% - 300px);
  margin: 0 auto 0;
  overflow: hidden;
  
  @media (max-width: 900px) and (min-width: 100px){
    width: calc(100% - 50px);
    margin-right: 0;
  }
`;

export const ChatHeaderStyled = styled.div`
  box-sizing: border-box;
`;

export const ChatInputStyled = styled.div`

`;
