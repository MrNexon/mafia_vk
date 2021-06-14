import { Dispatch } from 'redux';
import { HttpService } from '../HttpService';
import { RoomActions } from './Action/RoomActions';
import { RoomActionTypeEnum } from './Action/RoomActionTypeEnum';
import { PublicRoomType } from './Type/PublicRoomType';

export class RoomActionCreator {
  static list() {
    return async (dispatch: Dispatch<RoomActions>): Promise<void> => {
      const request = await HttpService.get<PublicRoomType[]>('room', 'list');
      dispatch({ type: RoomActionTypeEnum.LIST, payload: request.data });
    };
  }
}
