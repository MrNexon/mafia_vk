import { Dispatch } from 'redux';
import { PublicGatewaySendActions } from './SendAction/PublicGatewaySendActions';
import { PublicGatewaySendActionTypeEnum } from './SendAction/PublicGatewaySendActionTypeEnum';

export class PublicGatewayActionCreator {
  static subscribe() {
    return (dispatch: Dispatch<PublicGatewaySendActions>): void => {
      dispatch({
        type: PublicGatewaySendActionTypeEnum.SUBSCRIBE,
      });
    };
  }

  static unsubscribe() {
    return (dispatch: Dispatch<PublicGatewaySendActions>): void => {
      dispatch({
        type: PublicGatewaySendActionTypeEnum.UNSUBSCRIBE,
      });
    };
  }
}
