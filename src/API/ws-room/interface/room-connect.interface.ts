import { RoomDataInterface } from '../../room/interface/room-data.interface';

export interface RoomConnectInterface extends Pick<RoomDataInterface, 'id' | 'token'> {}
