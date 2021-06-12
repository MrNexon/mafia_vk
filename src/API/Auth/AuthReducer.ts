import { AuthState } from './AuthState';
import { AuthActions } from './Action/AuthActions';
import { AuthActionTypeEnum } from './Action/AuthActionTypeEnum';

const initialState: AuthState = {
  accessToken: null,
};

export const AuthReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionTypeEnum.APP:
      return { ...state, accessToken: action.payload.access_token };
    default:
      return state;
  }
};
