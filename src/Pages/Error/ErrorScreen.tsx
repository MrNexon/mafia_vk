import React, { Component } from 'react';
import './ErrorScreen.scss';
import Caption from '../../Component/Typography/Caption/Caption';
import CenterPanel from '../../Layout/CenterPanel/CenterPanel';

interface IProps {
	icon: React.ReactNode;
	text: string;
	buttons: React.ReactNode;
}

class ErrorScreen extends Component<IProps> {
	render() {
		return (
			<CenterPanel className="ErrorScreen" bottom={this.props.buttons}>
				<div className="ErrorScreen-Wrapper">
					<div className="ErrorScreen-Icon">{this.props.icon}</div>
					<div className="ErrorScreen-Text">
						<Caption level={1}>{this.props.text}</Caption>
					</div>
				</div>
			</CenterPanel>
		);
	}
}

export default ErrorScreen;
