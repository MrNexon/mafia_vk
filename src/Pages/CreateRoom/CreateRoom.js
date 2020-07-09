import React, {Component} from 'react';
import './CreateRoom.css';
import CenterPanel from "../../Layout/CenterPanel/CenterPanel";
import {FixedLayout, Panel, Title, Subhead, Button, ScreenSpinner, Switch} from "@vkontakte/vkui";
import Table from "../../Layout/Table/Table";
import RectButton from "../../Components/RectButton/RectButton";
import WS from "../../API/WS";

let usersCount;

class CreateRoom extends Component {
    constructor(props) {
        super(props);

        this.setUsersCount = this.setUsersCount.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.API = props.api;

        this.state = {
            usersCount: 0,
            publish: true
        }

        usersCount = 0;
    }

    setUsersCount(count) {
        this.setState({
            usersCount: count
        });
        usersCount = count;
    }

    renderButtons(count) {
        let content = [];
        for (let i = 5; i <= count; i++) {
            content.push(<RectButton selected={this.state.usersCount === i} onClick={this.setUsersCount}>{i}</RectButton>);
        }
        return content;
    }

    createRoom() {
        WS.toBuffer = true;
        this.props.popout(<ScreenSpinner />);
        this.API.Room.create(this.state.usersCount, this.state.publish)
            .then((data) => {
                WS.toBuffer = true;
                WS.connect();
                WS.onOpen = () => {
                    this.connectRoom(data.data.room_id);
                    WS.onOpen = null;
                }
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });
    }

    connectRoom(roomId) {
        this.API.Room.connect(roomId, 1)
            .then(() => {
                this.props.popout(null);
                this.props.action_create();
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <CenterPanel>
                    <div>
                        <Title level="1" weight="bold" className="center-header__title">Создание комнаты</Title>
                        <Subhead weight="regular" className="center_subheader__title">Выберите количество игроков</Subhead>
                        <Table>
                            {this.renderButtons(12)}
                        </Table>
                        <Subhead weight="bold" style={{marginTop: 20}}>Открытая</Subhead>
                        <Switch defaultChecked onClick={(event) => this.setState({publish: event.target.checked})} style={{display: 'inline-block', marginTop: 10}}/>
                    </div>
                </CenterPanel>

                <FixedLayout vertical="bottom" className="buttons__footer">
                    <Button size="l" mode="outline" className="control__button outline__button-cancel" onClick={this.props.action_back}>Назад</Button>
                    <Button disabled={typeof usersCount == 'undefined'} size="l" onClick={this.createRoom} className="control__button control__primary">Начать игру</Button>
                </FixedLayout>
            </Panel>

        );
    }
}

export default CreateRoom;