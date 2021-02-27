import React from 'react';
import StyledButton from './styled';

const Button = ({
  children, onClick, view, size = 'M', color = 'PINK',
}) => (
  <>
    <StyledButton color={color} view={view} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  </>
);

export default Button;
