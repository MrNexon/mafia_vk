import React, {Component} from 'react';
import './GameStepCard.css';
import {Subhead, Title} from "@vkontakte/vkui";

class GameStepCard extends Component {
    render() {
        return (
            <div className={"card__wrapper " + (this.props.hide ? "card__hide " : "") + this.props.className}>
                <Subhead weight="regular" className="step__title">{this.props.step}</Subhead>
                <Title level="1" weight="bold" className="timer__title">{this.props.timer}</Title>
            </div>
        );
    }
}

export default GameStepCard;