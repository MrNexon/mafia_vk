import { BaseAction } from '../../Redux/BaseAction';
import { AuthActionTypeEnum } from './AuthActionTypeEnum';
import { AppAuthResponseDto } from '../DTO/AppAuthResponse.dto';

export interface AuthAppAction extends BaseAction {
  type: typeof AuthActionTypeEnum.APP;
  payload: AppAuthResponseDto;
}
