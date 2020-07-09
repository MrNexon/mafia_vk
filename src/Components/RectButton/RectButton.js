import React, {Component} from 'react';

import './RectButton.css';
import {Text} from "@vkontakte/vkui";

class RectButton extends Component {
    constructor(props) {
        super(props);
        this.props.onClick();
    }

    render() {
        return (
            <button className={"rect__button" + (this.props.selected ? " rect__button-selected" : "")} onClick={() => this.props.onClick(this.props.children)}>
                <Text weight="semibold">{this.props.children}</Text>
            </button>
        );
    }
}

export default RectButton;