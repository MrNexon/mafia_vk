import { RoomState } from './RoomState';
import { RoomActions } from './Action/RoomActions';
import { RoomActionTypeEnum } from './Action/RoomActionTypeEnum';

const initialState: RoomState = {
  RoomList: [],
};

export const RoomReducer = (state = initialState, action: RoomActions): RoomState => {
  switch (action.type) {
    case RoomActionTypeEnum.LIST:
      return { ...state, RoomList: action.payload };
    default:
      return state;
  }
};
