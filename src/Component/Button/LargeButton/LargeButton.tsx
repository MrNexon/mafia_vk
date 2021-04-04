import React, { Component, EventHandler, ReactNode } from 'react';
import './LargeButton.scss';

interface IProps {
	onClick?: EventHandler<any>;
	icon?: ReactNode;
}

class LargeButton extends Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	render() {
		return (
			<div className="LargeButton" onClick={this.props.onClick}>
				<div className="LargeButton-Wrapper">
					<div className="LargeButton-Icon">{this.props.icon}</div>
					<div className="LargeButton-Text">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default LargeButton;
