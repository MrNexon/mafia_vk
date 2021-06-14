import { SocketState } from './SocketState';
import { SocketActionTypeEnum } from './Action/SocketActionTypeEnum';
import { SocketActions } from './Action/SocketActions';

const initialState: Partial<SocketState> = {};

export const SocketReducer = (state = initialState, action: SocketActions): Partial<SocketState> => {
  switch (action.type) {
    case SocketActionTypeEnum.INIT_CLIENT:
      return { ...state, Client: action.payload };
    case SocketActionTypeEnum.INIT_PUBLIC_GATEWAY:
      return { ...state, PublicGateway: action.payload };
    default:
      return state;
  }
};
