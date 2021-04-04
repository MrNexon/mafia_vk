import { User } from '../../auth-app/type/User';

export interface OnClientDisconnectInterface {
	User: Pick<User, 'id'>;
}
