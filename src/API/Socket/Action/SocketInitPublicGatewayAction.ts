import { BaseAction } from '../../Redux/BaseAction';
import { SocketActionTypeEnum } from './SocketActionTypeEnum';
import { PublicGateway } from '../Public/PublicGateway';

export interface SocketInitPublicGatewayAction extends BaseAction {
  type: SocketActionTypeEnum.INIT_PUBLIC_GATEWAY;
  payload: PublicGateway;
}
