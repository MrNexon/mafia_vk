import { Dispatch } from 'redux';
import { HttpService } from '../HttpService';
import { RoomActions } from './Action/RoomActions';
import { RoomActionTypeEnum } from './Action/RoomActionTypeEnum';
import { PublicRoomType } from './Type/PublicRoomType';
import { CreateRoomDto } from './DTO/CreateRoom.dto';

export class RoomActionCreator {
  static create(createRoomDto: CreateRoomDto) {
    return async (dispatch: Dispatch<RoomActions>): Promise<void> => {
      const request = await HttpService.post<PublicRoomType>('room', 'create', createRoomDto);
      dispatch({ type: RoomActionTypeEnum.CREATE, payload: request.data });
    };
  }

  static list() {
    return async (dispatch: Dispatch<RoomActions>): Promise<void> => {
      const request = await HttpService.get<PublicRoomType[]>('room', 'list');
      dispatch({ type: RoomActionTypeEnum.LIST, payload: request.data });
    };
  }
}
