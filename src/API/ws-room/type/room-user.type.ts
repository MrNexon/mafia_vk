import { UserStatusEnum } from '../user-status.enum';

export type RoomUser = {
	room_id: number;
	user_id: number;
	ws_id: string | null;
	status: UserStatusEnum;
	confirm_start: boolean;
	role: string | null;
	killed: boolean;
	kicked: boolean;
	connect_time: Date;
};
