import { BaseAction } from '../../Redux/BaseAction';
import { RoomTypeActionTypeEnum } from './RoomTypeActionTypeEnum';
import { RoomSettingsType } from '../Type/RoomSettingsType';

export interface RoomTypeListAction extends BaseAction {
  type: RoomTypeActionTypeEnum.LIST;
  payload: RoomSettingsType[];
}
