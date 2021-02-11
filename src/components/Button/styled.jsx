import styled from 'styled-components';

const Button = styled.button`
  color: ${(props) => (props.view === 'main' ? '#FFF' : '#EC96A4')};
  background-color: ${(props) => (props.view === 'main' ? '#EC96A4' : 'transparent')};
  border-color: ${(props) => (props.view === 'main' ? 'transparent' : '#EC96A4')};
  width: ${(props) => (props.size === 'S' ? '150px' : props.size === 'M' ? '170px' : '200px')};
  height: ${(props) => (props.size === 'S' ? '40px' : props.size === 'M' ? '45px' : '55px')};
  font-size: ${(props) => (props.size === 'S' ? '16px' : props.size === 'M' ? '20px' : '24px')};
    
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
  outline: none;
  transition: 0.2s ease-out;
    
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
