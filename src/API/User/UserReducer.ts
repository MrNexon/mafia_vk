import { UserState } from './UserState';
import { UserActions } from './Action/UserActions';
import { UserActionTypeEnum } from './Action/UserActionTypeEnum';

const initialState: UserState = {
  id: 0,
  first_name: '',
  last_name: '',
  avatar_src: '',
  online: false,
};

export const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypeEnum.GET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
