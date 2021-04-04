export type Room = {
	id: number;
	token: string;
	size: number;
	public: boolean;
	created: Date;
	updated: Date;
	phase: number;
	player_offset: number;
	player_speak: number;
	role_play: number;
	circle: number;
	vote_circle: number;
};
