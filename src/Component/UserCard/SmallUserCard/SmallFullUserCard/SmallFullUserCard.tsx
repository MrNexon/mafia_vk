import React, { Component } from 'react';
import classNames from 'classnames';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';
import { RoomUserListItemInterface } from '../../../../API/ws-room/interface/room-user-list-item.interface';
import { UserStatusEnum } from '../../../../API/ws-room/user-status.enum';
import '../SmallUserCard.scss';

interface IProps {
	selection?: 'none' | 'step' | 'action' | 'exposed';
	mode?: 'wait' | 'add';
	user?: RoomUserListItemInterface;
}

class SmallFullUserCard extends Component<IProps> {
	renderPlaceholderIcon() {
		switch (this.props.mode) {
			case 'wait':
			default:
				return <Icon28UserOutline />;
			case 'add':
				return <Icon28AddOutline />;
		}
	}

	renderStateIcon(user: RoomUserListItemInterface) {
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

	renderAvatarImage() {
		if (typeof this.props.user !== 'undefined') {
			let selector = classNames('SmallUserCard-AvatarImage', {
				'AvatarImage_step-select': this.props.selection === 'step',
				'AvatarImage_action-select': this.props.selection === 'action',
				'AvatarImage_exposed-select': this.props.selection === 'exposed',
			});

			return (
				<div
					className={selector}
					style={{
						backgroundImage: `url(${this.props.user.User.avatar})`,
					}}>
					{this.renderStateIcon(this.props.user)}
				</div>
			);
		} else
			return (
				<div className="SmallUserCard-AvatarImage AvatarImage_empty">
					{this.renderPlaceholderIcon()}
				</div>
			);
	}

	render() {
		return (
			<div className="SmallUserCard">
				<div className="SmallUserCard-Wrapper">
					{this.renderAvatarImage()}
					<div className="SmallUserCard-UserText">
						{typeof this.props.user === 'undefined'
							? 'Пусто'
							: this.props.user.User.first_name}
					</div>
				</div>
			</div>
		);
	}
}

export default SmallFullUserCard;
