import React, { Component, EventHandler } from 'react';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import { RoomUserPublicItemInterface } from '../../../../API/room/interface/room-public-item.interface';
import '../SmallUserCard.scss';
import classNames from 'classnames';
import { UserStatusEnum } from '../../../../API/ws-room/user-status.enum';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';

interface IProps {
	user?: RoomUserPublicItemInterface;
	onClick?: EventHandler<any>;
	className?: string;
}

class SmallShortUserCard extends Component<IProps> {
	renderAvatarImage() {
		if (typeof this.props.user !== 'undefined') {
			return (
				<div
					className="SmallUserCard-AvatarImage"
					style={{
						backgroundImage: `url(${this.props.user.User.avatar})`,
					}}>
					{this.renderStateIcon(this.props.user)}
				</div>
			);
		} else
			return (
				<div className="SmallUserCard-AvatarImage AvatarImage_empty">
					<Icon28AddOutline />
				</div>
			);
	}

	renderStateIcon(user: RoomUserPublicItemInterface) {
		switch (user.status) {
			case UserStatusEnum.CONNECTED:
				return '';
			case UserStatusEnum.DISCONNECTED:
				return (
					<div className="SmallUserCard-StateIcon">
						<Icon28ErrorCircleOutline />
					</div>
				);
		}
	}

	render() {
		return (
			<div
				className={classNames('SmallUserCard', this.props.className)}
				onClick={this.props.onClick}>
				<div className="SmallUserCard-Wrapper">{this.renderAvatarImage()}</div>
			</div>
		);
	}
}

export default SmallShortUserCard;
