import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h2>Profile</h2>
    <li><Link to="/chats">Chats</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/pairs">Pairs</Link></li>
    <li><Link to="/search">Search</Link></li>
    <li><Link to="/settings">Settings </Link></li>
  </div>
);
