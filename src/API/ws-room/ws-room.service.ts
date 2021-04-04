import io from 'socket.io-client';
import { APIService } from '../APIService';
import EventEmitter from 'events';
import { ResponseStatusInterface } from './interface/response-status.interface';
import { RoomConnectInterface } from './interface/room-connect.interface';
import { RoomUserListItemInterface } from './interface/room-user-list-item.interface';
import { OnClientDisconnectInterface } from './interface/on-client-disconnect.interface';
import { OnClientReconnectInterface } from './interface/on-client-reconnect.interface';

export declare interface WsRoomService {
	on(event: 'connect-room', listener: (status: ResponseStatusInterface) => void): this;
	on(event: 'users', listener: (users: RoomUserListItemInterface[]) => void): this;
	on(event: 'connected', listener: (data: RoomUserListItemInterface) => void): this;
	on(event: 'reconnected', listener: (data: OnClientReconnectInterface) => void): this;
	on(event: 'disconnected', listener: (user: OnClientDisconnectInterface) => void): this;
	on(event: 'exit', listener: (data: OnClientReconnectInterface) => void): this;
}

export class WsRoomService extends EventEmitter {
	private socket: SocketIOClient.Socket | null = null;

	private initConnection() {
		if (this.socket?.connected) this.disconnect();

		this.socket = io(`https://api.mtdl.ru`, {
			path: '/mafia/ws',
			query: {
				access_token: APIService.UserData.token,
			},
		});
	}

	private initEventHandlers() {
		this.socket?.on('connect-room', (responseStatus: ResponseStatusInterface) =>
			this.emit('connect-room', responseStatus),
		);

		this.socket?.on('users', (response: RoomUserListItemInterface[]) =>
			this.emit('users', response),
		);

		this.socket?.on('connected', (response: RoomUserListItemInterface) =>
			this.emit('connected', response),
		);

		this.socket?.on('disconnected', (response: OnClientDisconnectInterface) => {
			this.emit('disconnected', response);
		});

		this.socket?.on('reconnected', (response: OnClientReconnectInterface) => {
			this.emit('reconnected', response);
		});

		this.socket?.on('exit', (response: OnClientReconnectInterface) => {
			this.emit('exit', response);
		});
	}

	connect(roomConnect: RoomConnectInterface) {
		this.initConnection();
		this.initEventHandlers();

		this.socket?.on('connect', () => this.connectRoom(roomConnect));
	}

	connectRoom(roomConnect: RoomConnectInterface) {
		this.socket?.emit('connect-room', {
			room_id: roomConnect.id,
			token: roomConnect.token,
		});
	}

	exit() {
		this.socket?.emit('exit');
	}

	users() {
		console.log('Getting users');
		this.socket?.emit('users');
	}

	disconnect() {
		this.socket?.disconnect();
	}
}
