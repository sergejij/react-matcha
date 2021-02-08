import styled from 'styled-components';

const Button = styled.button`
  color: ${(props) => (props.view === 'main' ? '#FFF' : '#EC96A4')};
  background-color: ${(props) => (props.view === 'main' ? '#EC96A4' : 'transparent')};
  border-color: ${(props) => (props.view === 'main' ? 'transparent' : '#EC96A4')};
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
  padding: ${(props) => (props.size === 'S' ? '8px 25px' : props.size === 'M' ? '13px 50px' : '18px 70px')};
  outline: none;
  transition: 0.2s ease-out;
  
  font-size: ${(props) => (props.size === 'S' ? '16px' : props.size === 'M' ? '20px' : '24px')};
  
  &:hover {
    color: #FFF;
    background-color: ${(props) => (props.view === 'main' ? '#e0909e' : '#EC96A4')};
    cursor: pointer;
  }
  
  &:active {
    background-color: ${(props) => (props.view === 'main' ? '#d48794' : '#e0909e')};
  }
`;

export default Button;
