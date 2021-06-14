import { SocketInitClientAction } from './SocketInitClientAction';
import { SocketInitPublicGatewayAction } from './SocketInitPublicGatewayAction';

export type SocketActions = SocketInitClientAction | SocketInitPublicGatewayAction;
