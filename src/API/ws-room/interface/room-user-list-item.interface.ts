import { User } from '../../auth-app/type/User';
import { RoomUser } from '../type/room-user.type';

export interface RoomUserListItemInterface
	extends Pick<RoomUser, 'status' | 'confirm_start'> {
	User: UserListItemInterface;
}

export interface UserListItemInterface
	extends Pick<User, 'id' | 'first_name' | 'avatar'> {}
