import React from 'react';

import CenterPanel from "../../Layout/CenterPanel/CenterPanel";
import {Button, FixedLayout, Panel, ScreenSpinner, Subhead, Title} from "@vkontakte/vkui";
import API from "../../API/API";
import bridge from '@vkontakte/vk-bridge';

class CheckCode extends React.Component {
    constructor(props) {
        super(props);
        this.scanCode = this.scanCode.bind(this);
    }

    scanCode() {
        bridge.send("VKWebAppOpenCodeReader", {})
            .then((data) => {
                if (data.code_data === "d2f542b411827774a755e119bb02c801") {
                    this.props.action_done();
                } else {
                    this.props.popout(<ScreenSpinner />);
                    API.Request('bt', 'check_code', {code: data.code_data})
                        .then((data) => {
                            this.props.popout(null);
                            if (data.data.result) this.props.action_done();
                        });
                }
            });
    }

    render() {
        const date = API.GetTime();
        //const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        return (
            <Panel id={this.props.id}>
                <CenterPanel>
                    <Title level="1" weight="bold" className="name__title">Добро пожаловать на ЗБТ Мафии</Title>
                    <Subhead weight="regular" className="center_subheader__title" style={{fontStyle: "italic"}}>По всем вопросам бета тестирования обращайтесь в личные сообщения группы (см. О приложении)</Subhead>

                    {date / 1000 < 1592838000 && <Title level="3" weight="bold" className="center_subheader__title">Закрытый бета-тест начинается с 18:00 по МСК</Title>}
                    {/*{(API.userData.id === 152879324 || API.userData.id === 587556497) && (<BigButton className="button__create-room" onClick={this.props.action_create}>Создать</BigButton>)}
                    {(API.userData.id === 152879324 || API.userData.id === 587556497) && (<BigButton className="button__connect-room" onClick={this.props.action_rooms}>Комнаты</BigButton>)}*/}
                    {/*{(API.userData.id === 152879324 || API.userData.id === 587556497) && (<BigButton className="button__create-room" onClick={this.props.action_create}>Создать</BigButton>)}*/}
                    {/*<BigButton className="button__connect-room" onClick={this.props.action_rooms}>Комнаты</BigButton>*/}
                    {date / 1000 > 1592838000 && <Button size="l" className="control__button" onClick={this.scanCode}>Сканировать QR код</Button>}
                </CenterPanel>

                <FixedLayout vertical="bottom" className="logo__footer">
                    <div className="logo"/>
                    {/* <p>Refresh timestamp: {time}</p>*/}
                </FixedLayout>
            </Panel>
        );
    }
}

export default CheckCode;