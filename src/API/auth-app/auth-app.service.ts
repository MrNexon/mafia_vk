import { APIService } from '../APIService';
import { AuthLoginDto } from './dto/auth-login.dto';
import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../APIConst';
import bridge from '@vkontakte/vk-bridge';
import { AuthLoginResponseInterface } from './interface/auth-login-response.interface';

export class AuthAppService {
	private axios: AxiosInstance;

	constructor() {
		this.axios = axios.create({
			baseURL: BASE_URL + '/auth',
			responseType: 'json',
		});
	}

	async login() {
		let sign = '';
		const query = window.location.search
			.slice(1)
			.split('&')
			.filter((element) => {
				if (element.split('=')[0] === 'sign') sign = element.split('=')[1];
				if (element.match(/^vk/)) return element;
			})
			.join('&');
		const userData = await bridge.send('VKWebAppGetUserInfo');

		const send: AuthLoginDto = {
			auth: {
				query: query,
				sign: sign,
			},
			data: {
				user_id: userData.id,
				first_name: userData.first_name,
				last_name: userData.last_name,
				avatar: userData.photo_100,
			},
		};

		const { data } = await this.axios.post<AuthLoginResponseInterface>('/login', send);
		APIService.UserData = data.User;
		APIService.UserData.token = data.access_token;

		APIService.setToken();
	}
}
