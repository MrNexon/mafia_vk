import { BaseAction } from "../../../../Redux/BaseAction";
import { PublicGatewayActionTypeEnum } from "./PublicGatewayActionTypeEnum";
import { PublicRoomType } from "../../../../Room/Type/PublicRoomType";

export interface PublicGatewayRoomCreateAction extends BaseAction {
  type: PublicGatewayActionTypeEnum.ROOM_CREATE,
  payload: PublicRoomType
}
