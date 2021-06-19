import { RoomType } from './RoomType';
import { PublicRoomUserType } from './PublicRoomUserType';
import { RoomSettingsType } from '../../RoomType/Type/RoomSettingsType';

export type PublicRoomType = RoomType & {
  RoomUser: PublicRoomUserType[];
  RoomType: RoomSettingsType;
};
