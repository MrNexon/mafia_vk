import { BaseAction } from '../../../../Redux/BaseAction';
import { RoomGatewaySendActionTypeEnum } from './RoomGatewaySendActionTypeEnum';
import { ConnectRoomRequestDto } from '../DTO/ConnectRoomRequest.dto';

export interface RoomGatewayConnectSendAction extends BaseAction {
  type: RoomGatewaySendActionTypeEnum.CONNECT;
  payload: ConnectRoomRequestDto;
}
