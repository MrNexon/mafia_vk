import { BaseAction } from '../../Redux/BaseAction';
import { SocketAckActionTypeEnum } from './SocketAckActionTypeEnum';
import { StatusResponseDto } from '../DTO/StatusResponse.dto';

export interface SocketStatusAuthAction extends BaseAction {
  type: SocketAckActionTypeEnum;
  payload: StatusResponseDto;
}
