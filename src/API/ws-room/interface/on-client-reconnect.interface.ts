import { RoomUser } from '../type/room-user.type';

export interface OnClientReconnectInterface
	extends Pick<RoomUser, 'status' | 'confirm_start'> {
	User: OnClientReConnectUserDataInterface;
}

export interface OnClientReConnectUserDataInterface {
	id: number;
}
