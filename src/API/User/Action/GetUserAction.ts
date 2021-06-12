import { BaseAction } from '../../Redux/BaseAction';
import { UserActionTypeEnum } from './UserActionTypeEnum';
import { UserType } from '../Type/UserType';

export interface GetUserAction extends BaseAction {
  type: typeof UserActionTypeEnum.GET;
  payload: UserType;
}
