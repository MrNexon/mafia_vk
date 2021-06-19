import { Socket } from 'socket.io-client';
import DisconnectReason = Socket.DisconnectReason;

export interface SocketState {
  connected: boolean;
  reason?: DisconnectReason;
  authorized: boolean;
}
