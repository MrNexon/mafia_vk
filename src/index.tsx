import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoot } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import * as dotenv from 'dotenv';
import App from './App';
/*import '@vkontakte/vkui/dist/vkui.css';
import './VKFix.scss';*/
import './Font/stylesheet.css';
import './MainStyle.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootStore } from './API/Redux/Store';

dotenv.config({});
bridge.send('VKWebAppInit', {});

ReactDOM.render(
  <React.StrictMode>
    <AppRoot>
      <Provider store={rootStore}>
        <App />
      </Provider>
    </AppRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your mafia_vk_frontend, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
