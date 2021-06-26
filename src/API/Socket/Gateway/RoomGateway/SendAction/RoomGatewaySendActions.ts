import { RoomGatewayConnectSendAction } from './RoomGatewayConnectSendAction';
import { RoomGatewayDisconnectSendAction } from './RoomGatewayDisconnectSendAction';

export type RoomGatewaySendActions = RoomGatewayConnectSendAction | RoomGatewayDisconnectSendAction;
