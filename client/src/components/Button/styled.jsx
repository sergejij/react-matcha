import styled from 'styled-components';
import COLORS from '../../constants';

const Button = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.view === 'main' ? '#FFF' : props.color === "BLACK" ? "#000" : COLORS.PINK)};
  background-color: ${(props) => (props.view === 'main' ? (props.color === 'PINK' ? COLORS.PINK : COLORS.YELLOW) : 'transparent')};
  border-color: ${(props) => (props.view === 'main' ? 'transparent' : props.color === "BLACK" ? "#000" : COLORS.PINK)};
  width: ${(props) => (props.like ? '40px' : props.size === 'XS' ? '140px' : props.size === 'S' ? '160px' : props.size === 'M' ? '200px' : '350px')};
  height: ${(props) => (props.like ? '40px' : props.size === 'XS' ? '30px' : props.size === 'S' ? '40px' : props.size === 'M' ? '45px' : '55px')};
  font-size: ${(props) => (props.size === 'XS' ? '14px' : props.size === 'S' ? '16px' : props.size === 'M' ? '20px' : '24px')};
    
  border-width: 1px;
  border-style: solid;
  border-radius: ${(props) => (props.like ? '100px' : '13px')};
  outline: none;
  transition: 0.2s ease-out;
    
  &:hover {
    transition: 0.2s ease-out;
    color: #FFF;
    background-color: ${(props) => (props.view === 'main' ? (props.color === 'PINK' ? '#e0909e' : '#d1d35b') : props.color === "BLACK" ? "#000" : COLORS.PINK)};
    cursor: pointer;
    svg {
      color: ${(props) => (props.like ? (props.color === 'PINK' ? 'white' : COLORS.PINK): COLORS.DARK)};
    }
  }
  
  &:active {
    transition: 0.2s ease-out;
    background-color: ${(props) => (props.view === 'main' ? (props.color === 'PINK' ? '#d48794' : '#c9ca5c') : props.color === "BLACK" ? "#414141" : '#e0909e')};
  }
  
  svg {
    transition: 0.2s ease-out;
    color: ${(props) => (props.like ? (props.view === 'out' ? COLORS.PINK : 'white' ): COLORS.DARK)};
  }
`;

export default Button;
