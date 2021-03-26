import styled from 'styled-components';
import COLORS from './constants';

export const Text = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : '16px')};
`;

export const Content = styled.div`
  //position:relative;
  display:flex;
  justify-content: space-between;
  width: calc(100% - 130px);
`;

export const IconPencil = styled.div`
  display: inline-block;
  color: ${COLORS.PINK};
  padding-left: ${(props) => props.size};
  
  & svg {
    width: ${(props) => (props.size ? props.size : '16px')};
    height: ${(props) => (props.size ? props.size : '16px')};
  }
`;
