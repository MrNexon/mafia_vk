import React, { Component, ReactNode } from 'react';
import './CenterPanel.scss';
import classNames from 'classnames';

interface IProps {
	bottom?: ReactNode;
	className?: string;
}

class CenterPanel extends Component<IProps> {
	render() {
		return (
			<div className={classNames('CenterPanel', this.props.className)}>
				<div className="CenterPanel-Wrapper">{this.props.children}</div>
				<div className="CenterPanel-Bottom">{this.props.bottom}</div>
			</div>
		);
	}
}

export default CenterPanel;
