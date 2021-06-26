import { RoomListAction } from './RoomListAction';
import { PublicGatewayRoomCreateAction } from '../../Socket/Gateway/PublicGateway/Action/PublicGatewayRoomCreateAction';
import { PublicGatewayRoomUpdateAction } from '../../Socket/Gateway/PublicGateway/Action/PublicGatewayRoomUpdateAction';
import { RoomCreateAction } from './RoomCreateAction';
import { RoomGatewayStatusConnectAckAction } from '../../Socket/Gateway/RoomGateway/AckAction/RoomGatewayStatusConnectAckAction';
import { RoomGatewayActions } from '../../Socket/Gateway/RoomGateway/Action/RoomGatewayActions';

export type RoomActions =
  | RoomListAction
  | RoomCreateAction
  | PublicGatewayRoomCreateAction
  | PublicGatewayRoomUpdateAction
  | RoomGatewayStatusConnectAckAction
  | RoomGatewayActions;
