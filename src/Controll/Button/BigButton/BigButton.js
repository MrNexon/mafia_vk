import React, {Component} from 'react';

import "./BigButton.scss";

class BigButton extends Component {
    render() {
        return (
            <div className="BigButton" onClick={this.props.onClick}>
                <div className="BigButton-Wrapper">
                    <div className="BigButton-Icon">{this.props.icon}</div>
                    <div className="BigButton-Text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default BigButton;