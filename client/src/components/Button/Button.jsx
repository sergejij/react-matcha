import React from 'react';
import StyledButton from './styled';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Button = ({
  children, onClick, view, size = 'M', color = 'PINK', like, dislike
}) => (
  <>
    <StyledButton like={like || dislike} color={color} view={view} size={size} onClick={onClick}>
        {!(like || dislike) && children}
        {like && <ThumbUpIcon />}
        {dislike && <ThumbDownIcon />}
    </StyledButton>
  </>
);

export default Button;
