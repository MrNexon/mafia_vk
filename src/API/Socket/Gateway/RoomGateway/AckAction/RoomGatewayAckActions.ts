import { RoomGatewayStatusConnectAckAction } from './RoomGatewayStatusConnectAckAction';
import { RoomGatewayStatusDisconnectAckAction } from './RoomGatewayStatusDisconnectAckAction';

export type RoomGatewayAckActions = RoomGatewayStatusConnectAckAction | RoomGatewayStatusDisconnectAckAction;
