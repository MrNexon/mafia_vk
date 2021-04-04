import React, { Component } from 'react';
import './Caption.scss';
import classNames from 'classnames';

interface IProps {
	level: 1 | 2;
	className?: string
}

class Caption extends Component<IProps> {
	render() {
		return (
			<div className={classNames("Caption", this.props.className)} data-level={this.props.level}>
				{this.props.children}
			</div>
		);
	}
}

export default Caption;
