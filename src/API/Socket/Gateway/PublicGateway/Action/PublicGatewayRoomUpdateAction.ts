import { BaseAction } from '../../../../Redux/BaseAction';
import { PublicGatewayActionTypeEnum } from './PublicGatewayActionTypeEnum';
import { PublicRoomType } from '../../../../Room/Type/PublicRoomType';

export interface PublicGatewayRoomUpdateAction extends BaseAction {
  type: PublicGatewayActionTypeEnum.ROOM_UPDATE;
  payload: PublicRoomType;
}
