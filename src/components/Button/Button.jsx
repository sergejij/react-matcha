import React from 'react';
import StyledButton from './styled';

const Button = ({ children, onClick, view }) => (
  <>
    <StyledButton view={view} onClick={onClick}>
      {children}
    </StyledButton>
  </>
);

export default Button;
