import { BaseAction } from '../../../../Redux/BaseAction';
import { PublicGatewaySendActionTypeEnum } from './PublicGatewaySendActionTypeEnum';

export interface PublicGatewaySubscribeSendAction extends BaseAction {
  type: PublicGatewaySendActionTypeEnum.SUBSCRIBE;
}
