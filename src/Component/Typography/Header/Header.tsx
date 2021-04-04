import React, { Component } from 'react';
import { Div } from '@vkontakte/vkui';
import './Header.scss';

interface IProps {
	level: 1 | 2;
}

class Header extends Component<IProps> {
	render() {
		return (
			<Div>
				<div className="Header" data-level={this.props.level}>
					{this.props.children}
				</div>
			</Div>
		);
	}
}

export default Header;
