import React, { Component, EventHandler } from 'react';
import './BoxButton.scss';
import classNames from 'classnames';

interface IProps {
	active: boolean;
	onClick: EventHandler<any>;
	className?: string;
}

class BoxButton extends Component<IProps> {
	render() {
		return (
			<div
				className={classNames(
					'BoxButton',
					{
						BoxButton_active: this.props.active,
					},
					this.props.className,
				)}
				onTouchStart={this.props.onClick}
				onMouseDown={this.props.onClick}
				/*onAnimationStart={() => console.log('start')}
				onAnimationEnd={() => console.log('end')}*/
			>
				<div className="BoxButton-Wrapper">
					<div className="BoxButton-Text">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default BoxButton;
