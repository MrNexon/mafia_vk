import React, {Component} from 'react';
import './Table.css';

class Table extends Component {
    render() {
        return (
            <div className="table__wrapper">
                {this.props.children}
            </div>
        );
    }
}

export default Table;