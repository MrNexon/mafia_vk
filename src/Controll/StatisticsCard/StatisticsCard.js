import React, {Component} from 'react';

import './StatisticsCard.scss';

class StatisticsCard extends Component {
    render() {
        return (
            <div className="StatisticsCard">
                <div className="StatisticsCard-Wrapper">
                    <div className="StatisticsCard-Icon">{this.props.icon}</div>
                    <div className="StatisticsCard-Text">
                        <div className="Text-Counter">{this.props.counter}</div>
                        <div className="Text-Subject">{this.props.children}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatisticsCard;