import React, {Component} from 'react';
import CenterPanel from "../../Layout/CenterPanel/CenterPanel";
import {Button, FixedLayout, Panel, Subhead, Title} from "@vkontakte/vkui";
import './RoleScreen.css';
import GameStepCard from "../../Components/GameStepCard/GameStepCard";
import API from "../../API/API";
import APIGame from "../../API/APIGame";
import Table from "../../Layout/Table/Table";
import APIRoom from "../../API/APIRoom";
import UserEntity from "../../Components/UserEntity/UserEntity";
import WS from "../../API/WS";

let timer = 5;
let futime;

class RoleScreen extends Component {
    constructor(props) {
        super(props);

        this.checkTimer = this.checkTimer.bind(this);
        this.getRole = this.getRole.bind(this);
        this.renderUserEntity = this.renderUserEntity.bind(this);

        this.API = props.api;
        this.state = {
            show: false,
            timer: '00:05',
            team: []
        }
    }

    componentDidMount() {
        WS.onMessage = null;
        futime = API.GetTime() + (timer * 1000);
        this.checkTimer();
        this.getRole();
    }

    checkTimer() {
        let seconds = Math.round((futime - API.GetTime()) / 1000);
        if (seconds >= 0) setTimeout(this.checkTimer, 100);
        else this.setState({show: true});

        this.setState({timer: '00:0' + seconds });
    }

    getRole() {
        this.API.Game.getRole(API.userData.id)
            .then(() => {
                this.setState({
                    team: APIGame.team
                })
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });


    }

    renderUserEntity() {
        if (!this.state.show) return [];
        let content = [];
        if (this.state.team.length < 2) return;
        content.push(<Title level="2" weight="bold" style={{marginTop: 10}}>Союзники:</Title>)
        for (let i = 0; i < this.state.team.length; i++) {
            if (typeof this.state.team[i] !== 'undefined')
                content.push(<UserEntity
                    avatar={this.state.team[i].avatar}
                    name={this.state.team[i].name}
                    id={this.state.team[i].id}
                    key={i}
                />);
        }
        return content;
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <CenterPanel>
                    <div>
                        <Title level="1" weight="bold" className="page__header" style={{marginBlockEnd: 0}}>Игра начинается</Title>
                        <Subhead weight="regular" className="page__subheader">Ваша роль появится на экране</Subhead>
                        <Title level="2" weight="bold" className={"game__role " + (this.state.show ? "": "hide")}>{APIGame.role.alias}</Title>
                        <GameStepCard timer={this.state.timer} className="hider" hide={this.state.show}/>
                        <Table>
                            {this.renderUserEntity()}
                        </Table>
                    </div>
                </CenterPanel>

                <FixedLayout vertical="bottom" className="buttons__footer">
                    <Button size="l" onClick={this.props.action_ready} className={"control__button control__primary " + (this.state.show ? "": "hide")}>Готов</Button>
                </FixedLayout>
            </Panel>
        );
    }
}

export default RoleScreen;