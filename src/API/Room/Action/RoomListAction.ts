import { BaseAction } from '../../Redux/BaseAction';
import { RoomActionTypeEnum } from './RoomActionTypeEnum';
import { PublicRoomType } from '../Type/PublicRoomType';

export interface RoomListAction extends BaseAction {
  type: RoomActionTypeEnum.LIST;
  payload: PublicRoomType[];
}
