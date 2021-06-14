import { BaseAction } from '../../Redux/BaseAction';
import { SocketActionTypeEnum } from './SocketActionTypeEnum';
import { SocketClient } from '../SocketClient';

export interface SocketInitClientAction extends BaseAction {
  type: SocketActionTypeEnum.INIT_CLIENT;
  payload: SocketClient;
}
