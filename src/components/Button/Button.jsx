import React from 'react';
import StyledButton from './styled';

const Button = ({ children }) => (
  <StyledButton>
    {children}
  </StyledButton>
);

export default Button;
