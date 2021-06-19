import { SocketStatusConnectAction } from './SocketStatusConnectAction';
import { SocketStatusDisconnectAction } from './SocketStatusDisconnectAction';
import { SocketStatusAuthAction } from './SocketStatusAuthAction';

export type SocketActions = SocketStatusConnectAction | SocketStatusDisconnectAction | SocketStatusAuthAction;
