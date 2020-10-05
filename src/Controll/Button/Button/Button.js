import React, {Component} from 'react';

import "./Button.scss";

class Button extends Component {
    render() {
        return (
            <div className="Button" data-style={this.props.outline ? "outline" : ""} data-mode={this.props.mode}>
                <div className="Button-Wrapper">
                    <div className="Button-Text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Button;