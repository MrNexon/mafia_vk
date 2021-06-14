import { RoomListAction } from './RoomListAction';
import { RoomUpdateByIdAction } from './RoomUpdateByIdAction';
import { RoomCreateAction } from './RoomCreateAction';

export type RoomActions = RoomListAction | RoomUpdateByIdAction | RoomCreateAction;
