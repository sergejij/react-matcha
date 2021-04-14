import styled from 'styled-components';
import COLORS from './constants';

export const Text = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : '16px')};
`;

export const MyLink = styled.a`
  display:flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : '16px')};
`;

export const Content = styled.div`
  display:flex;
  justify-content: space-between;
  width: calc(100% - 130px);

  @media (max-width: 700px) and (min-width: 100px) {
    width: 100%;
  }
`;

export const IconPencil = styled.div`
  display: inline-block;
  color: ${COLORS.PINK};
  padding-left: ${(props) => props.size};
  cursor: pointer;
  
  & svg {
    width: ${(props) => (props.size ? props.size : '16px')};
    height: ${(props) => (props.size ? props.size : '16px')};
  }
`;
