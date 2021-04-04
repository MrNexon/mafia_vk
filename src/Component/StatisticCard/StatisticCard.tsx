import React, { Component, ReactNode } from 'react';
import './StatisticCard.scss';

interface IProps {
	icon: ReactNode;
	value: string;
}

class StatisticCard extends Component<IProps> {
	render() {
		return (
			<div className="StatisticCard">
				<div className="StatisticCard-Wrapper">
					<div className="StatisticCard-Icon">{this.props.icon}</div>
					<div className="StatisticCard-Text">
						<div className="Text-Counter">{this.props.value}</div>
						<div className="Text-Subject">{this.props.children}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StatisticCard;
