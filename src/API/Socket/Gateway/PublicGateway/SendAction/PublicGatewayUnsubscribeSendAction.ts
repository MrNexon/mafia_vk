import { BaseAction } from '../../../../Redux/BaseAction';
import { PublicGatewaySendActionTypeEnum } from './PublicGatewaySendActionTypeEnum';

export interface PublicGatewayUnsubscribeSendAction extends BaseAction {
  type: PublicGatewaySendActionTypeEnum.UNSUBSCRIBE;
}
