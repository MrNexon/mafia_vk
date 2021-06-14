import { BaseAction } from '../../Redux/BaseAction';
import { RoomActionTypeEnum } from './RoomActionTypeEnum';
import { RoomType } from '../Type/RoomType';

export interface RoomListAction extends BaseAction {
  type: RoomActionTypeEnum.LIST;
  payload: RoomType[];
}
