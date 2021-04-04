import { User } from '../type/User';

export interface AuthLoginResponseInterface {
	access_token: string;
	User: User;
}
