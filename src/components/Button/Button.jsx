import React from 'react';
import StyledButton from './styled';

const Button = ({
  children, onClick, view, size = 'M',
}) => (
  <>
    <StyledButton view={view} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  </>
);

export default Button;
