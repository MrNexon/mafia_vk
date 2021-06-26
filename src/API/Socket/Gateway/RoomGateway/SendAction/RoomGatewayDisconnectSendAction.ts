import { BaseAction } from '../../../../Redux/BaseAction';
import { RoomGatewaySendActionTypeEnum } from './RoomGatewaySendActionTypeEnum';

export interface RoomGatewayDisconnectSendAction extends BaseAction {
  type: RoomGatewaySendActionTypeEnum.DISCONNECT;
}
