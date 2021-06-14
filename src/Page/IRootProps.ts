import { AppActiveViewType } from '../App';
import { ReduxConnectType } from '../API/Redux/ReduxConnectType';

export default interface IRootProps extends ReduxConnectType {
  id: string;
  setView: (view: AppActiveViewType) => void;
}
