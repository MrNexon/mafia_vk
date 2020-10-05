import React, {Component} from 'react';
import classNames from 'classnames';

import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import './SmallUserCard.scss';

class SmallUserCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            selection: this.props.selection
        }
    }

    renderPlaceholderIcon() {
        switch (this.props.mode) {
            case "wait":
            default:
                return <Icon28UserOutline/>;
            case "add":
                return <Icon28AddOutline/>;

        }
    }

    renderAvatarImage() {
        if (typeof this.props.user !== 'undefined') {
            let selector = classNames('SmallUserCard-AvatarImage', {
                'AvatarImage_step-select': this.state.selection === 'step',
                'AvatarImage_user-select': this.state.selection === 'user',
                'AvatarImage_player-select': this.state.selection === 'player'
            });

            return <div className={selector} style={{
                backgroundImage: 'url(' + this.props.user.avatar + ')'
            }}/>;
        } else
            return (
                <div className="SmallUserCard-AvatarImage AvatarImage_empty">
                    {this.renderPlaceholderIcon()}
                </div>
            );
    }

    render() {
        return (
            <div className="SmallUserCard">
                <div className="SmallUserCard-Wrapper">
                    {this.renderAvatarImage()}
                    <div className="SmallUserCard-UserText">
                        {
                            typeof this.props.user === 'undefined' ? 'Пусто' : this.props.user.first_name
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default SmallUserCard;

/*

user - UserEntity
mode - wait | add

*/