import React, { Component } from 'react';
import './ButtonGroup.scss';

class ButtonGroup extends Component {
	render() {
		return <div className="ButtonGroup">{this.props.children}</div>;
	}
}

export default ButtonGroup;
