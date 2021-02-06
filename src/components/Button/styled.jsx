import styled from 'styled-components';

const Button = styled.button`
  color: ${(props) => (props.view === 'main' ? '#FFF' : '#EC96A4')};
  background-color: ${(props) => (props.view === 'main' ? '#EC96A4' : 'transparent')};
  border-color: ${(props) => (props.view === 'main' ? 'transparent' : '#EC96A4')};
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
  padding: 13px 40px;
  outline: none;
  transition: 0.2s ease-out;
  
  font-size: 20px;
  
  &:hover {
    color: ${(props) => (props.view === 'main' ? '#FFF' : '#FFF')};
    background-color: ${(props) => (props.view === 'main' ? '#e0909e' : '#EC96A4')};
  }
  
  &:active {
    background-color: ${(props) => (props.view === 'main' ? '#d48794' : '#e0909e')};
  }
`;

export default Button;
