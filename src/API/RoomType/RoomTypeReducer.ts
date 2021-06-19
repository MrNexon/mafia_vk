import { RoomTypeState } from './RoomTypeState';
import { RoomTypeActions } from './Action/RoomTypeActions';
import { RoomTypeActionTypeEnum } from './Action/RoomTypeActionTypeEnum';

const initialState: RoomTypeState = {
  RoomTypes: [],
};

export const RoomTypeReducer = (state = initialState, action: RoomTypeActions): RoomTypeState => {
  switch (action.type) {
    case RoomTypeActionTypeEnum.LIST:
      return { ...state, RoomTypes: action.payload };
    default:
      return { ...state };
  }
};
