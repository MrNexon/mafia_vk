import { RoomState } from './RoomState';
import { RoomActions } from './Action/RoomActions';
import { RoomActionTypeEnum } from './Action/RoomActionTypeEnum';
import { PublicGatewayActionTypeEnum } from '../Socket/Gateway/PublicGateway/Action/PublicGatewayActionTypeEnum';

const initialState: RoomState = {
  RoomList: [],
};

export const RoomReducer = (state = initialState, action: RoomActions): RoomState => {
  switch (action.type) {
    case RoomActionTypeEnum.LIST:
      return { ...state, RoomList: action.payload };
    case PublicGatewayActionTypeEnum.ROOM_CREATE:
      return { ...state, RoomList: [action.payload, ...state.RoomList] };
    case PublicGatewayActionTypeEnum.ROOM_UPDATE:
      const rooms = state.RoomList.map((room) =>
        room.id === action.payload.id ? { ...room, ...action.payload } : room,
      );
      return { ...state, RoomList: rooms };
    default:
      return state;
  }
};
