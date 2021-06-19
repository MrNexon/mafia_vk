import { Dispatch } from 'redux';
import { rootStore } from '../Redux/Store';
import { SocketSendActions } from './SendAction/SocketSendActions';
import { SocketSendActionTypeEnum } from './SendAction/SocketSendActionTypeEnum';

export class SocketActionCreator {
  static auth() {
    return (dispatch: Dispatch<SocketSendActions>): void => {
      const { accessToken } = rootStore.getState().Auth;
      if (accessToken)
        ///TODO Return value
        dispatch({
          type: SocketSendActionTypeEnum.AUTH_LOGIN,
          payload: {
            access_token: accessToken,
          },
        });
    };
  }
}
