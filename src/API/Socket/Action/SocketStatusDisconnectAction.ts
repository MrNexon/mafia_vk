import { BaseAction } from '../../Redux/BaseAction';
import { SocketActionTypeEnum } from './SocketActionTypeEnum';
import { Socket } from 'socket.io-client';
import DisconnectReason = Socket.DisconnectReason;

export interface SocketStatusDisconnectAction extends BaseAction {
  type: SocketActionTypeEnum.STATUS_DISCONNECT;
  payload: DisconnectReason;
}
