import { Dispatch } from 'redux';
import { HttpService } from '../HttpService';
import { UserType } from './Type/UserType';
import { UserActionTypeEnum } from './Action/UserActionTypeEnum';
import { UserActions } from './Action/UserActions';

export class UserActionCreator {
  static get() {
    return async (dispatch: Dispatch<UserActions>): Promise<void> => {
      const request = await HttpService.get<UserType>('user', 'get');
      dispatch({ type: UserActionTypeEnum.GET, payload: request.data });
    };
  }
}
