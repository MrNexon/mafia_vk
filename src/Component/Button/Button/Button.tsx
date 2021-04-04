import React, { Component, EventHandler } from 'react';
import './Button.scss';

interface IProps {
	style?: 'normal' | 'outline';
	status?: 'primary' | 'destructive' | 'success';
	onClick?: EventHandler<any>;
	disable?: boolean;
	size?: 'l' | 's';
}

class Button extends Component<IProps> {
	render() {
		return (
			<div
				className="Button"
				data-size={this.props.size}
				data-disable={this.props.disable}
				data-style={this.props.style}
				data-status={this.props.status}
				onClick={!this.props.disable ? this.props.onClick : () => {}}>
				<div className="Button-Wrapper">
					<div className="Button-Text">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default Button;
