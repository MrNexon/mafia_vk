import { RoomListAction } from './RoomListAction';
import { PublicGatewayRoomCreateAction } from '../../Socket/Gateway/PublicGateway/Action/PublicGatewayRoomCreateAction';
import { PublicGatewayRoomUpdateAction } from '../../Socket/Gateway/PublicGateway/Action/PublicGatewayRoomUpdateAction';
import { RoomCreateAction } from './RoomCreateAction';
import { RoomGatewayActions } from '../../Socket/Gateway/RoomGateway/Action/RoomGatewayActions';
import { RoomGatewayAckActions } from '../../Socket/Gateway/RoomGateway/AckAction/RoomGatewayAckActions';

export type RoomActions =
  | RoomListAction
  | RoomCreateAction
  | PublicGatewayRoomCreateAction
  | PublicGatewayRoomUpdateAction
  | RoomGatewayAckActions
  | RoomGatewayActions;
