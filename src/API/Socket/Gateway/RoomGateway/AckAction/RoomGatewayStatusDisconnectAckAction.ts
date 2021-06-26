import { BaseAction } from '../../../../Redux/BaseAction';
import { RoomGatewayAckActionTypeEnum } from './RoomGatewayAckActionTypeEnum';
import { StatusResponseDto } from '../../../DTO/StatusResponse.dto';

export interface RoomGatewayStatusDisconnectAckAction extends BaseAction {
  type: RoomGatewayAckActionTypeEnum.DISCONNECT;
  payload: StatusResponseDto;
}
