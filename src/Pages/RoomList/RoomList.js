import React, {Component} from 'react';
import {
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Subhead,
    PanelSpinner,
    PullToRefresh,
    Placeholder, ScreenSpinner
} from "@vkontakte/vkui";

import UserEntity from "../../Components/UserEntity/UserEntity";
import './RoomList.css';
import WS from "../../API/WS";

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.API = props.api;
        
        this.renderRoomCards = this.renderRoomCards.bind(this);
        this.updateRoomList = this.updateRoomList.bind(this);
        this.wsUpdater = this.wsUpdater.bind(this);
        this.userConnect = this.userConnect.bind(this);
        this.backButton = this.backButton.bind(this);

        this.state = {
            rooms: [],
            noRooms: false,
            fetching: false
        }
    }

    componentDidMount() {
        WS.toBuffer = true;
        WS.onMessage = this.wsUpdater;
        WS.connect();

        this.updateRoomList();
    }

    updateRoomList() {
        WS.toBuffer = true;
        this.setState({fetching: true});
        this.API.Room.getList()
            .then((data) => {
                this.setState({
                    rooms: data.data.room_list,
                    noRooms: data.data.room_list.length < 1
                });
                this.setState({fetching: false});
                WS.readBuffer();
            })
            .catch((data) => {
                this.props.showError(data);
            });
    }

    renderRoomCards() {
        let content = [];

        if (this.state.rooms.length < 1 && !this.state.noRooms) content.push(<PanelSpinner />);
        else if (this.state.noRooms) {
            content.push(<Placeholder>Нет доступных комнат</Placeholder>);
        }
        else
            this.state.rooms.forEach((room, i) => {
                content.push(this.renderRoomGroup(room, i + 1));
            });

        return content;
    }

    renderRoomGroup(room, roomNumber) {
        let content = [];
        content.push(
            <Group className="room__wrapper" onClick={() => this.userConnect(room.room_id)}>
                <div className="room__wrapper">
                    {this.renderRoomEntity(roomNumber, room.users, room.users_count)}
                </div>
            </Group>
        );

        return content;
    }

    renderRoomEntity(roomNumber, users, usersCount) {
        let content = [];

        content.push(<Subhead weight="regular" className="room__header">Комната #{roomNumber}</Subhead>);
        for (let i = 0; i < usersCount; i++) {
            if (typeof users[i] !== "undefined")
                content.push(<UserEntity
                                className="short__card"
                                avatar={users[i].avatar}/>);
            else
                content.push(<UserEntity
                    className="short__card" mode="add"/>);
        }

        return content;
    }

    wsUpdater(message) {
        let rooms = this.state.rooms;
        if (message.class !== 'room') return;

        switch (message.event) {
            case 'create':
                let isExist = false;
                rooms.forEach((room) => {
                    isExist = room.room_id === message.room_id;
                });

                if (!isExist){
                    rooms.push({
                        room_id: message.room_id,
                        users_count: message.data.users_count,
                        users: []
                    });

                    this.setState({
                        fetching: false,
                        noRooms: false
                    });
                }
                break;
            case 'connect':
                rooms = rooms.map((room) => {
                    if (room.room_id === message.room_id) {
                        let isExist = false;
                        room.users.forEach((user) => {
                            if (user.id === +message.data.user.id) isExist = true;
                        });

                        if (!isExist) room.users.push({
                            id: +message.data.user.id,
                            avatar: message.data.user.avatar
                        });
                    }

                    return room;
                });
                break;
            case 'disconnect':
                rooms = rooms.map((room) => {
                    if (room.room_id === message.room_id) {
                        let indexDelete = -1;
                        room.users.forEach((user, index) => {
                            if (user.id === +message.data.user.id) indexDelete = index;
                        });
                        if (indexDelete > -1) room.users.splice(indexDelete, 1);
                    }
                    return room;
                });
                break;
            case 'delete':
                rooms.forEach((room, index) => {
                    if (room.room_id === message.room_id) {
                        rooms.splice(index, 1);
                    }
                });
                break;
        }

        this.setState({
            rooms: rooms
        });
    }

    userConnect(roomId) {
        this.props.popout(<ScreenSpinner />);
        WS.disconnect();
        this.API.Room.connect(roomId, 1)
            .then(() => {
                WS.toBuffer = true;
                WS.connect();
                this.props.popout(null);
                this.props.action_connect();
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });
    }

    backButton() {
        WS.disconnect();
        this.props.action_back();
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.backButton}/>}>Комнаты</PanelHeader>
                <PullToRefresh onRefresh={this.updateRoomList} isFetching={this.state.fetching}>
                    {this.renderRoomCards()}
                </PullToRefresh>
            </Panel>
        );
    }
}

export default RoomList;