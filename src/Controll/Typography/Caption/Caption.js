import React, {Component} from 'react';

import "./Caption.scss"

class Caption extends Component {
    render() {
        return (
            <div className="Caption" data-level={this.props.level}>
                {this.props.children}
            </div>
        );
    }
}

export default Caption;