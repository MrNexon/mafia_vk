import React, { Component } from 'react';

import './StepUserCard.scss';

interface IProps {
	timer: string;
	action: string;
}

class StepUserCard extends Component<IProps> {
	render() {
		return (
			<div className="StepUserCard">
				<div className="StepUserCard-Wrapper">
					<div
						className="StepUserCard-AvatarImage"
						/*style={{
							backgroundImage: `url(${this.props.user.avatar})`,
						}}*/
					/>
					<div className="StepUserCard-CardContent">
						<div className="CardContent-Timer">{this.props.timer}</div>
						<div className="CardContent-Action">{this.props.action}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StepUserCard;
