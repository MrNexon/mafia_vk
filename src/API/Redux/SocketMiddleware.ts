import { Middleware } from 'redux';
import { Socket } from 'socket.io-client';
import { BaseAction } from './BaseAction';

export const socketMiddleware = (socket: Socket): Middleware => {
  return (store) => {
    socket.on('connect', () => {
      store.dispatch({
        type: `SOCKET_STATUS/CONNECT`,
      });
    });

    socket.on('disconnect', (reason) => {
      store.dispatch({
        type: `SOCKET_STATUS/DISCONNECT`,
        payload: reason,
      });
    });

    socket.onAny((event, data) => {
      store.dispatch({
        type: `SOCKET_EVENT/${event}`,
        payload: data,
      });
    });

    return (next) => (action: BaseAction) => {
      const actionType = String(action.type).match(/SOCKET_SEND*\/([A-Z_]*)/);
      if (actionType && actionType[1])
        return new Promise((resolve) => {
          socket.emit(actionType[1], action.payload, (data: any) => {
            resolve(data);
            store.dispatch({
              type: `SOCKET_ACK/${actionType[1]}`,
              payload: data,
            });
          });
        });
      else return next(action);
    };
  };
};
