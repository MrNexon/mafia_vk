import { BaseAction } from '../../Redux/BaseAction';
import { RoomActionTypeEnum } from './RoomActionTypeEnum';
import { PublicRoomType } from '../Type/PublicRoomType';

export interface RoomCreateAction extends BaseAction {
  type: RoomActionTypeEnum.CREATE;
  payload: PublicRoomType;
}
