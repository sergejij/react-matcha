import React from 'react';
import Button from '../../components/Button';

export default () => (
  <div>
    <Button view="main" onClick={() => alert('Main btn')}>
      Привет Мир
    </Button>

    <Button view="out" onClick={() => alert('Out btn')}>
      Привет Мир
    </Button>
  </div>
);
