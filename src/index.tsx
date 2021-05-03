import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoot } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import '@vkontakte/vkui/dist/vkui.css';
import './VKFix.scss';
import './Font/SF_UI/stylesheet.css';
import './MainStyle.scss';

import reportWebVitals from './reportWebVitals';

bridge.send('VKWebAppInit', {});

ReactDOM.render(
  <React.StrictMode>
    <AppRoot>
      <App />
    </AppRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
