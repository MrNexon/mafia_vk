import { BaseAction } from '../../Redux/BaseAction';
import { SocketActionTypeEnum } from './SocketActionTypeEnum';

export interface SocketStatusConnectAction extends BaseAction {
  type: SocketActionTypeEnum.STATUS_CONNECT;
}
