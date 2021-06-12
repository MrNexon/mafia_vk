import { Dispatch } from 'redux';
import { HttpService } from '../HttpService';
import { AppAuthResponseDto } from './DTO/AppAuthResponse.dto';
import { AuthActions } from './Action/AuthActions';
import { AuthActionTypeEnum } from './Action/AuthActionTypeEnum';

export class AuthActionCreator {
  static app(query: string) {
    const params = query
      .slice(query.indexOf('?') + 1)
      .split('&')
      .reduce((params, hash) => {
        let [key, val] = hash.split('=');
        return Object.assign(params, { [key]: decodeURIComponent(val) });
      }, {});

    return async (dispatch: Dispatch<AuthActions>): Promise<void> => {
      const request = await HttpService.get<AppAuthResponseDto>('auth', 'app', params);
      dispatch({ type: AuthActionTypeEnum.APP, payload: request.data });
    };
  }
}
