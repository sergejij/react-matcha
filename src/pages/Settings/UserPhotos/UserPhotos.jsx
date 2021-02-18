import { useRouteMatch } from 'react-router-dom';
import React from 'react';

const UserPhotos = () => {
  const { url } = useRouteMatch();
  return (
    <h1>{url}</h1>
  );
};

export default UserPhotos;
