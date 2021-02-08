import styled from 'styled-components';

const Text = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? props.size : '16px')};
`;

export default Text;
