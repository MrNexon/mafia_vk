import { AuthAppService } from './auth-app/auth-app.service';
import { User } from './auth-app/type/User';
import { RoomService } from './room/room.service';
import { RoomDataInterface } from './room/interface/room-data.interface';
import { WsRoomService } from './ws-room/ws-room.service';

export class APIService {
	public static UserData: User;
	public static RoomData: RoomDataInterface;

	public static AuthApp: AuthAppService = new AuthAppService();
	public static Room: RoomService = new RoomService();
	public static WsRoom: WsRoomService = new WsRoomService();

	static setToken() {
		this.Room.setToken();
	}
}
