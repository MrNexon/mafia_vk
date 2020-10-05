import React, {Component} from 'react';

import "./BoxButton.scss";

class BoxButton extends Component {
    render() {
        return (
            <div className={"BoxButton" + (this.props.active ? " BoxButton_active" : "")}>
                <div className="BoxButton-Wrapper">
                    <div className="BoxButton-Text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default BoxButton;