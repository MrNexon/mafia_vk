import { ConnectRoomRequestDto } from './DTO/ConnectRoomRequest.dto';
import { Dispatch } from 'redux';
import { RoomGatewaySendActions } from './SendAction/RoomGatewaySendActions';
import { RoomGatewaySendActionTypeEnum } from './SendAction/RoomGatewaySendActionTypeEnum';

export class RoomGatewayActionCreator {
  static connect(connectRoomRequestDto: ConnectRoomRequestDto) {
    return (dispatch: Dispatch<RoomGatewaySendActions>): void => {
      dispatch({
        type: RoomGatewaySendActionTypeEnum.CONNECT,
        payload: connectRoomRequestDto,
      });
    };
  }

  static disconnect() {
    return (dispatch: Dispatch<RoomGatewaySendActions>): void => {
      dispatch({
        type: RoomGatewaySendActionTypeEnum.DISCONNECT,
      });
    };
  }
}
