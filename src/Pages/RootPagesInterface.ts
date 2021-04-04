import { ViewComponentInterface } from './ViewComponentInterface';

export interface RootPagesInterface extends ViewComponentInterface {
	onChangeView: (
		view: 'Loading' | 'Main' | 'Room' | 'RoomList',
		childView?: string,
	) => void;
	activeView?: string;
}
