import React, {Component} from 'react';

import './CardRow.scss';

class CardRow extends Component {
    render() {
        return (
            <div className="CardRow">
                {this.props.children}
            </div>
        );
    }
}

export default CardRow;