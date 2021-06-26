import { RoomState } from './RoomState';
import { RoomActions } from './Action/RoomActions';
import { RoomActionTypeEnum } from './Action/RoomActionTypeEnum';
import { PublicGatewayActionTypeEnum } from '../Socket/Gateway/PublicGateway/Action/PublicGatewayActionTypeEnum';
import { RoomGatewayAckActionTypeEnum } from '../Socket/Gateway/RoomGateway/AckAction/RoomGatewayAckActionTypeEnum';
import { RoomGatewayActionTypeEnum } from '../Socket/Gateway/RoomGateway/Action/RoomGatewayActionTypeEnum';

const initialState: RoomState = {
  RoomList: [],
};

export const RoomReducer = (state = initialState, action: RoomActions): RoomState => {
  switch (action.type) {
    case RoomActionTypeEnum.CREATE:
      return { ...state, Room: { ...action.payload, connected: false } };
    case RoomActionTypeEnum.LIST:
      return { ...state, RoomList: action.payload };
    case PublicGatewayActionTypeEnum.ROOM_CREATE:
      return { ...state, RoomList: [action.payload, ...state.RoomList] };
    case PublicGatewayActionTypeEnum.ROOM_UPDATE:
      const rooms = state.RoomList.map((room) =>
        room.id === action.payload.id ? { ...room, ...action.payload } : room,
      );
      return { ...state, RoomList: rooms };
    case RoomGatewayAckActionTypeEnum.CONNECT:
      return { ...state, Room: { ...action.payload.data.Room, connected: action.payload.status } };

    case RoomGatewayAckActionTypeEnum.DISCONNECT:
      return { ...state, Room: undefined };

    case RoomGatewayActionTypeEnum.UPDATE: ///TODO Гарантия существования объекта комнаты
      if (typeof state.Room === 'undefined') return state;

      return { ...state, Room: { ...state.Room, ...action.payload } };
    default:
      return state;
  }
};
