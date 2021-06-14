import { BaseAction } from '../../Redux/BaseAction';
import { RoomActionTypeEnum } from './RoomActionTypeEnum';
import { PublicRoomType } from '../Type/PublicRoomType';

export interface RoomUpdateByIdAction extends BaseAction {
  type: RoomActionTypeEnum.SOCKET_UPDATE;
  payload: PublicRoomType;
}
