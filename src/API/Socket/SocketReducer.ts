import { SocketState } from './SocketState';
import { SocketActionTypeEnum } from './Action/SocketActionTypeEnum';
import { SocketActions } from './Action/SocketActions';
import { SocketAckActionTypeEnum } from './Action/SocketAckActionTypeEnum';

const initialState: SocketState = {
  connected: false,
  authorized: false,
};

export const SocketReducer = (state = initialState, action: SocketActions): Partial<SocketState> => {
  switch (action.type) {
    case SocketActionTypeEnum.STATUS_CONNECT:
      return { ...state, connected: true, reason: undefined, authorized: false };
    case SocketActionTypeEnum.STATUS_DISCONNECT:
      return {
        ...state,
        connected: false,
        reason: action.payload,
        authorized: false,
      };
    case SocketAckActionTypeEnum.LOGIN_AUTH:
      return {
        ...state,
        authorized: action.payload.status,
      };
    default:
      return state;
  }
};
