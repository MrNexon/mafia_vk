import { applyMiddleware, combineReducers, createStore } from 'redux';
import { AuthReducer } from '../Auth/AuthReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserReducer } from '../User/UserReducer';
import { RoomReducer } from '../Room/RoomReducer';
import { SocketReducer } from '../Socket/SocketReducer';
import { socketMiddleware } from './SocketMiddleware';
import { io } from 'socket.io-client';
import { RoomTypeReducer } from '../RoomType/RoomTypeReducer';

const socket = io(`http://localhost:3001`, {
  path: '/api/gateway',
});

export const rootStore = createStore(
  combineReducers({
    Auth: AuthReducer,
    User: UserReducer,
    Room: RoomReducer,
    Socket: SocketReducer,
    RoomType: RoomTypeReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(socket))),
);

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
