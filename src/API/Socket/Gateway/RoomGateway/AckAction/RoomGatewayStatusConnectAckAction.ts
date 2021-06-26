import { BaseAction } from '../../../../Redux/BaseAction';
import { RoomGatewayAckActionTypeEnum } from './RoomGatewayAckActionTypeEnum';
import { StatusResponseDto } from '../../../DTO/StatusResponse.dto';
import { ConnectRoomStatusResponseDto } from '../DTO/ConnectRoomStatusResponse.dto';

export interface RoomGatewayStatusConnectAckAction extends BaseAction {
  type: RoomGatewayAckActionTypeEnum.ROOM_CONNECT;
  payload: StatusResponseDto<ConnectRoomStatusResponseDto>;
}
