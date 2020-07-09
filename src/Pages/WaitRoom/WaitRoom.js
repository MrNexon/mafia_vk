import React, {Component} from 'react';

import {Button, FixedLayout, Panel, ScreenSpinner, Title} from "@vkontakte/vkui";

import CenterPanel from "../../Layout/CenterPanel/CenterPanel";
import Table from "../../Layout/Table/Table";
import UserEntity from "../../Components/UserEntity/UserEntity";
import './WaitRoom.css';
import APIRoom from "../../API/APIRoom";
import WS from "../../API/WS";
import bridge from '@vkontakte/vk-bridge';

class WaitRoom extends Component {
    constructor(props) {
        super(props);

        this.renderUserTable = this.renderUserTable.bind(this);
        this.wsMessage = this.wsMessage.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.startRoom = this.startRoom.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
        this.share = this.share.bind(this);

        this.API = props.api;
        
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        WS.onMessage = this.wsMessage;
        this.getUsers();
    }

    getUsers() {
        WS.toBuffer = true;
        this.API.Room.getUsers()
            .then((data) => {
                this.setState({
                    users: data.data.users
                });

                WS.readBuffer();
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });
    }

    renderUserTable() {
        let content = [];

        for (let i = 0; i < APIRoom.usersCount; i++) {
            if (typeof this.state.users[i] !== 'undefined')
                content.push(<UserEntity avatar={this.state.users[i].avatar} name={this.state.users[i].name} id={this.state.users[i].id}/>);
            else content.push(<UserEntity name="Пусто" mode="wait"/>);
        }

        return content;
    }

    wsMessage(message) {
        let users = this.state.users;
        if (APIRoom.roomId !== message.room_id) return;
        if (message.class !== 'room' && message.event !== 'start') return;
        switch (message.event) {
            case 'connect':
                let exist = false;
                users.forEach((user) => {
                    if (user.id === +message.data.user.id) exist = true;
                });

                if (!exist) {
                    users.push({
                        id: +message.data.user.id,
                        name: message.data.user.name,
                        avatar: message.data.user.avatar
                    });
                }
                break;
            case 'disconnect':
                let indexDelete = -1;

                users.forEach((user, index) => {
                    if (user.id === +message.data.user.id) indexDelete = index;
                });
                if (indexDelete > -1) users.splice(indexDelete, 1);
                break;
            case 'start':
                WS.toBuffer = true;
                this.props.action_start();
                break;
            default:
                break;
        }

        this.setState({
            users: users
        });
    }

    startRoom() {
        this.props.popout(<ScreenSpinner />);
        this.API.Game.start()
            .then(() => {
                this.props.popout(null);
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });

    }

    exitRoom() {
        this.props.popout(<ScreenSpinner />);

        this.API.Room.disconnect()
            .then(() => {
                WS.disconnect();
                this.props.popout(null);
                this.props.action_exit();
            });

    }

    share() {
        bridge.send("VKWebAppShare", {
            "link": "https://vk.com/app7477902#join=" + APIRoom.roomId
        });
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <CenterPanel>
                    <div>
                        <Title level="1" weight="bold" className="page__header">Ожидаем игроков</Title>
                        <Table>
                            {this.renderUserTable()}
                        </Table>
                    </div>
                </CenterPanel>

                <FixedLayout vertical="bottom" className="buttons__footer">
                    <Button size="l" mode="outline" className="control__button outline__button-cancel" onClick={this.exitRoom}>Выйти</Button>
                    <Button size="l" className="control__button" mode="commerce" onClick={this.share}>Поделиться</Button>
                    <div>
                        {APIRoom.isHost && (<Button disabled={this.state.users.length !== APIRoom.usersCount} size="l" style={{width: 210}} onClick={this.startRoom} className="control__button control__primary">Начать игру</Button>)}
                    </div>
                </FixedLayout>
            </Panel>
        );
    }
}

export default WaitRoom;