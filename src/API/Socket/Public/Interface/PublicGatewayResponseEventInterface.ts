import { PublicRoomType } from '../../../Room/Type/PublicRoomType';

export interface PublicGatewayResponseEventInterface {
  'public/event/room/create': (room: PublicRoomType) => void;
  'public/event/room/update': (room: PublicRoomType) => void;
}
