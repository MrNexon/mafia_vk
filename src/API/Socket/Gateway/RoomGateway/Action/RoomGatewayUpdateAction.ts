import { BaseAction } from '../../../../Redux/BaseAction';
import { RoomGatewayActionTypeEnum } from './RoomGatewayActionTypeEnum';
import { PublicRoomType } from '../../../../Room/Type/PublicRoomType';

export interface RoomGatewayUpdateAction extends BaseAction {
  type: RoomGatewayActionTypeEnum.UPDATE;
  payload: PublicRoomType;
}
