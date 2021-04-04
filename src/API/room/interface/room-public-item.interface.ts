import { User } from '../../auth-app/type/User';
import { Room } from '../type/room.type';
import { RoomUser } from '../../ws-room/type/room-user.type';

export interface RoomPublicItemInterface extends Pick<Room, 'id' | 'token' | 'size'> {
	RoomUser: RoomUserPublicItemInterface[];
}

export interface RoomUserPublicItemInterface extends Pick<RoomUser, 'status'> {
	User: UserPublicItemInterface;
}

export interface UserPublicItemInterface extends Pick<User, 'avatar'> {}
