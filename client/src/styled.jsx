import styled from 'styled-components';

export const Text = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : '16px')};
`;

export const Content = styled.div`
  display:flex;
  justify-content: space-between;
  width: calc(100% - 130px);
`;
