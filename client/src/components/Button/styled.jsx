import styled from 'styled-components';
import COLORS from '../../constants';

const Button = styled.button`
  color: ${(props) => (props.view === 'main' ? '#FFF' : COLORS.PINK)};
  background-color: ${(props) => (props.view === 'main' ? (props.color === 'PINK' ? COLORS.PINK : COLORS.YELLOW) : 'transparent')};
  border-color: ${(props) => (props.view === 'main' ? 'transparent' : COLORS.PINK)};
  width: ${(props) => (props.size === 'S' ? '160px' : props.size === 'M' ? '200px' : '350px')};
  height: ${(props) => (props.size === 'S' ? '40px' : props.size === 'M' ? '45px' : '55px')};
  font-size: ${(props) => (props.size === 'S' ? '16px' : props.size === 'M' ? '20px' : '24px')};
    
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
  outline: none;
  transition: 0.2s ease-out;
    
  &:hover {
    color: #FFF;
    background-color: ${(props) => (props.view === 'main' ? (props.color === 'PINK' ? '#e0909e' : '#d1d35b') : COLORS.PINK)};
    cursor: pointer;
  }
  
  &:active {
    background-color: ${(props) => (props.view === 'main' ? (props.color === 'PINK' ? '#d48794' : '#c9ca5c') : '#e0909e')};
  }
`;

export default Button;
