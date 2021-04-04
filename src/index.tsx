import React from 'react';
import ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';
import './VKFix.scss';
import './Component/ComponentValue.scss';
import './Colors.scss';
import './App.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit', {}).then(() => {
	console.log('Init send');
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
