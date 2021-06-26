import { PublicRoomType } from './Type/PublicRoomType';
import { RoomStateType } from './Type/RoomStateType';

export interface RoomState {
  RoomList: PublicRoomType[];
  Room?: PublicRoomType & RoomStateType;
}
