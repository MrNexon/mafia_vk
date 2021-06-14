import { SocketClient } from './SocketClient';
import { PublicGateway } from './Public/PublicGateway';

export interface SocketState {
  Client: SocketClient;
  PublicGateway: PublicGateway;
}
