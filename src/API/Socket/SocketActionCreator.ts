import { Dispatch } from 'redux';
import { SocketActions } from './Action/SocketActions';
import { SocketActionTypeEnum } from './Action/SocketActionTypeEnum';
import { SocketClient } from './SocketClient';
import { PublicGateway } from './Public/PublicGateway';

export class SocketActionCreator {
  static init() {
    return async (dispatch: Dispatch<SocketActions>): Promise<void> => {
      dispatch({
        type: SocketActionTypeEnum.INIT_CLIENT,
        payload: new SocketClient(),
      });

      dispatch({
        type: SocketActionTypeEnum.INIT_PUBLIC_GATEWAY,
        payload: new PublicGateway(),
      });
    };
  }
}
