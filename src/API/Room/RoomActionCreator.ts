import { Dispatch } from 'redux';
import { HttpService } from '../HttpService';
import { RoomActions } from './Action/RoomActions';
import { RoomType } from './Type/RoomType';
import { RoomActionTypeEnum } from './Action/RoomActionTypeEnum';

export class RoomActionCreator {
  static list() {
    return async (dispatch: Dispatch<RoomActions>): Promise<void> => {
      const request = await HttpService.get<RoomType[]>('room', 'list');
      dispatch({ type: RoomActionTypeEnum.LIST, payload: request.data });
    };
  }
}
