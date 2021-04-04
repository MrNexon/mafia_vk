import { ViewComponentInterface } from './ViewComponentInterface';
import React, { EventHandler } from 'react';

export interface RoomWrapperPageInterface extends ViewComponentInterface {
	onNextPage: EventHandler<any>;
	onPrevPage?: EventHandler<any>;
	onAnimationEnd?: EventHandler<any>;

	animation: boolean | undefined;

	setPopout: (node: React.ReactNode) => void;
}
