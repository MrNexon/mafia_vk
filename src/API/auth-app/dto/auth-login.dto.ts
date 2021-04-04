export interface AuthDataDto {
	query: string;
	sign: string;
}

export interface UserDataDto {
	user_id: number;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface AuthLoginDto {
	auth: AuthDataDto;
	data: UserDataDto;
}
