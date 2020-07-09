import React from 'react';

import "./BigButton.css";
import { Button } from "@vkontakte/vkui";

class BigButton extends React.Component {
    render() {
        return (
            <div className="big__button-wrapper">
                <Button className={"big__button " + this.props.className} mode="tertiary" onClick={this.props.onClick}/>
                <p className="big__button-subtitle">{this.props.children}</p>
            </div>
        )
    }
}

export default BigButton;