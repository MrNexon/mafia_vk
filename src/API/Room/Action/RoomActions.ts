import { RoomListAction } from './RoomListAction';
import { PublicGatewayRoomCreateAction } from '../../Socket/Gateway/PublicGateway/Action/PublicGatewayRoomCreateAction';
import { PublicGatewayRoomUpdateAction } from '../../Socket/Gateway/PublicGateway/Action/PublicGatewayRoomUpdateAction';

export type RoomActions = RoomListAction | PublicGatewayRoomCreateAction | PublicGatewayRoomUpdateAction;
