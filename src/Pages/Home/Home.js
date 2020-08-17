import React from 'react';

import "./Home.css";

import CenterPanel from "../../Layout/CenterPanel/CenterPanel";
import BigButton from "../../Components/BigButton/BigButton";
import {FixedLayout, Panel, Subhead, Title} from "@vkontakte/vkui";
import API from "../../API/API";

class Home extends React.Component {
    render() {
        let audio = new Audio("https://mafia.mtdl.ru/voices/sity_sleep.ogg");
        //const date = new Date();
        //const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        return (
            <Panel id={this.props.id}>
                <CenterPanel>
                    <Title level="1" weight="bold" className="name__title">Добро пожаловать!</Title>
                    <Subhead weight="regular" className="center_subheader__title">Приложение постоянно тестируется, возможно большое количество ошибок!</Subhead>
                    {/*{(API.userData.id === 152879324 || API.userData.id === 587556497) && (<BigButton className="button__create-room" onClick={this.props.action_create}>Создать</BigButton>)}
                    {(API.userData.id === 152879324 || API.userData.id === 587556497) && (<BigButton className="button__connect-room" onClick={this.props.action_rooms}>Комнаты</BigButton>)}*/}
                    {/*{(API.userData.id === 152879324 || API.userData.id === 587556497) && (<BigButton className="button__create-room" onClick={this.props.action_create}>Создать</BigButton>)}*/}
                    <BigButton className="button__create-room" onClick={() => audio.play()}>Создать</BigButton>
                    <BigButton className="button__connect-room" onClick={this.props.action_rooms}>Комнаты</BigButton>
                </CenterPanel>

                <FixedLayout vertical="bottom" className="logo__footer">
                    <div className="logo"/>
                   {/* <p>Refresh timestamp: {time}</p>*/}
                </FixedLayout>
            </Panel>
        );
    }
}

export default Home;
