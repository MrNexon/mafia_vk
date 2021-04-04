import React, { Component } from 'react';
import './ButtonRow.scss';

class ButtonRow extends Component {
	render() {
		return <div className="ButtonRow">{this.props.children}</div>;
	}
}

export default ButtonRow;
