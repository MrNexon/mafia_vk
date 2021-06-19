import { BaseAction } from '../../Redux/BaseAction';
import { SocketSendActionTypeEnum } from './SocketSendActionTypeEnum';
import { SocketLoginAuthDto } from '../DTO/SocketLoginAuth.dto';

export interface SocketSendAuthAction extends BaseAction {
  type: SocketSendActionTypeEnum.AUTH_LOGIN;
  payload: SocketLoginAuthDto;
}
