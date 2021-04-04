import { Room } from '../type/room.type';

export interface RoomDataInterface extends Pick<Room, 'id' | 'token' | 'size'> {}
