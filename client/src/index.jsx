import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';
import {notification, Button} from "antd";

const openNotification = () => {
    notification.open({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
        {/*<Button type="primary" onClick={openNotification}>*/}
        {/*    Open the notification box*/}
        {/*</Button>*/}
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
