import { Dispatch } from 'redux';
import { HttpService } from '../HttpService';
import { RoomTypeActions } from './Action/RoomTypeActions';
import { RoomSettingsType } from './Type/RoomSettingsType';
import { RoomTypeActionTypeEnum } from './Action/RoomTypeActionTypeEnum';

export class RoomTypeActionCreator {
  static list() {
    return async (dispatch: Dispatch<RoomTypeActions>): Promise<void> => {
      const request = await HttpService.get<RoomSettingsType[]>('room_type', 'list');
      dispatch({ type: RoomTypeActionTypeEnum.LIST, payload: request.data });
    };
  }
}
