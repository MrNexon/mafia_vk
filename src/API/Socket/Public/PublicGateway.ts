import { rootStore } from '../../Redux/Store';
import { Socket } from 'socket.io-client';
import { PublicGatewayResponseEventInterface } from './Interface/PublicGatewayResponseEventInterface';
import { RoomActionTypeEnum } from '../../Room/Action/RoomActionTypeEnum';
import { PublicRoomType } from '../../Room/Type/PublicRoomType';
import { PublicGatewayRequestEventInterface } from './Interface/PublicGatewayRequestEventInterface';

export class PublicGateway {
  private readonly client: Socket<PublicGatewayResponseEventInterface, PublicGatewayRequestEventInterface>;
  constructor() {
    const { Client } = rootStore.getState().Socket;
    if (!Client) throw new Error('');

    this.client = Client.getClient();
    this.init();
  }

  init() {
    this.client.emit('public/subscribe');

    this.client.on('public/event/room/create', this.onRoomCreate);
    this.client.on('public/event/room/update', this.onRoomUpdate);
  }

  onRoomCreate(room: PublicRoomType) {
    rootStore.dispatch({
      type: RoomActionTypeEnum.SOCKET_CREATE,
      payload: room,
    });
  }

  onRoomUpdate(room: PublicRoomType) {
    rootStore.dispatch({
      type: RoomActionTypeEnum.SOCKET_UPDATE,
      payload: room,
    });
  }
}
