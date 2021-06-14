import { RoomType } from './RoomType';
import { PublicRoomUserType } from './PublicRoomUserType';
import { RoomSettingsType } from './RoomSettingsType';

export type PublicRoomType = RoomType & {
  RoomUser: PublicRoomUserType[];
  RoomType: RoomSettingsType;
};
