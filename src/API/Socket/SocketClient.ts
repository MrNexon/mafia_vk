import { Socket, io } from 'socket.io-client';
import { rootStore } from '../Redux/Store';

export class SocketClient {
  private readonly client: Socket;

  constructor() {
    const { accessToken } = rootStore.getState().Auth;
    if (!accessToken) throw new Error('Access token undefined');

    this.client = io(`http://localhost:3001/`, {
      query: {
        access_token: accessToken,
      },
    });
  }

  getClient<T, D>(): Socket<T, D> {
    return this.client;
  }
}
