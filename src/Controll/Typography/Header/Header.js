import React, {Component} from 'react';

import "./Header.scss"
import {Div} from "@vkontakte/vkui";

class Header extends Component {
    render() {
        return (
            <Div>
                <div className="Header" data-level={this.props.level}>
                    {this.props.children}
                </div>
            </Div>
        );
    }
}

export default Header;