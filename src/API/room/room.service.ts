import { BASE_URL } from '../APIConst';
import axios, { AxiosInstance } from 'axios';
import { APIService } from '../APIService';
import { RoomCreateDto } from './dto/room-create.dto';
import { RoomDataInterface } from './interface/room-data.interface';
import { RoomPublicItemInterface } from './interface/room-public-item.interface';

export class RoomService {
	private axios: AxiosInstance;

	constructor() {
		this.axios = axios.create({
			baseURL: BASE_URL + '/room',
			responseType: 'json',
		});
	}

	setToken() {
		this.axios.defaults.headers.common = {
			Authorization: `Bearer ${APIService.UserData.token}`,
		};
	}

	async create(roomCreate: RoomCreateDto): Promise<RoomDataInterface> {
		const { data } = await this.axios.post<RoomDataInterface>('/create', roomCreate);
		APIService.RoomData = data;

		return data;
	}

	async list(): Promise<RoomPublicItemInterface[]> {
		const { data } = await this.axios.get<RoomPublicItemInterface[]>('/list');
		return data;
	}

	async active(): Promise<RoomPublicItemInterface | null> {
		const { data } = await this.axios.get<RoomPublicItemInterface | null>('/active');
		return data;
	}
}
