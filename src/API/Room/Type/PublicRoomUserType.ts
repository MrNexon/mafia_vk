import { RoomUserType } from './RoomUserType';
import { UserType } from '../../User/Type/UserType';

export type PublicRoomUserType = Pick<RoomUserType, 'is_dead' | 'status'> & {
  User: Pick<UserType, 'id' | 'first_name' | 'last_name' | 'avatar_src'>;
};
