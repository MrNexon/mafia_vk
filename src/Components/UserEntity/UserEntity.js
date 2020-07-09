import React, {Component} from 'react';
import './UserEntity.css';
import {Caption} from "@vkontakte/vkui";

class UserEntity extends Component {
    render() {
        return (
            <div className={"user__block " + this.props.className} onClick={this.props.onClick}>
                <div className={"user__card" +
                    (this.props.blue_select ? " user__select" : "") +
                    (this.props.red_select ? " partner__select" : "") +
                    (this.props.green_select ? " user__choose" : "") +
                    (this.props.killed ? " user__kill" : "") +
                    (this.props.disable ? " disable" : "") +
                    " " + (this.props.mode)}>

                    <div className={"user__avatar " +
                        (this.props.killed ? " user__kill" : "")}
                         style={{ backgroundImage: `url(${this.props.avatar})`}}/>

                    {(this.props.select_count > 0 && this.props.show_counter) && <Caption level="4" weight="regular" className="select__counter">{"x" + this.props.select_count}</Caption>}
                    {/*{this.props.show_key && (<div className="key__counter">{this.props.key_index}</div>)}*/}
                </div>
                {typeof this.props.name !== 'undefined' && (<Caption level="3" weight="regular" className="user__title">{this.props.name}</Caption>)}
            </div>
        );
    }
}

export default UserEntity;