import React from 'react';
import {Root, View, Snackbar, Avatar, Alert, ScreenSpinner} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';


import '@vkontakte/vkui/dist/vkui.css';
import Home from "./Pages/Home/Home";
import CreateRoom from "./Pages/CreateRoom/CreateRoom";
import GameRoom from "./Pages/GameRoom/GameRoom";
import RoomList from "./Pages/RoomList/RoomList";
import API from "./API/API";
import WS from "./API/WS";
import WaitRoom from "./Pages/WaitRoom/WaitRoom";
import RoleScreen from "./Pages/RoleScreen/RoleScreen";
import CheckCode from "./Pages/CheckCode/CheckCode";

var subtitle;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.setPopout = this.setPopout.bind(this);
        this.showError = this.showError.bind(this);
        this.showErrorDialog = this.showErrorDialog.bind(this);
        this.connect = this.connect.bind(this);

        this.state = {
            activeView: 'start',
            activePanel: 'start_screen',
            popout: null
        }
    }

    componentDidMount() {
        this.setPopout(<ScreenSpinner/>);
        this.API = new API();
        WS.onError = this.wsError;

        this.API.initVkUserData()
          .then(() => {
              this.connect();
              this.setPopout(null);
          })
          .catch();
    }

    setPopout(element) {
      this.setState({popout: element});
    }

    wsError(error) {

    }

    showError(error) {
        if (error === null || typeof error === 'undefined' || typeof error.data === 'undefined'){
            console.warn(error);
            return;
        }

        this.setPopout(
          <Snackbar
              layout="vertical"
              onClose={() => this.setPopout(null)}
              action="Подробнее"
              onActionClick={() => this.showErrorDialog(error)}
              before={<Avatar size={24} style={{backgroundColor: '#ff0944'}}><Icon24Cancel fill="#fff" width={14} height={14} /></Avatar>}
          >
              Ошибка сервера. Код ошибки: {error.data.err_code}
          </Snackbar>
        );

        this.setState({
          activeView: 'start',
          activePanel: 'start_screen'
        })
    }

    showErrorDialog(data) {
        if (data === null || typeof data === 'undefined') return;
        this.setPopout(<Alert
            actions={[{
                title: 'Ок',
                autoclose: true,
                mode: 'cancel'
            }]}
            onClose={() => this.setPopout(null)}
        >
            <p>{data.data.err_msg}</p><br/>
            <p>Код: {data.data.err_code}</p><br/>
            <p>Данные: {data.data.err_data}</p>
        </Alert>);
    }

    connect() {
        var params = window
            .location
            .hash
            .replace('#','')
            .split('&')
            .reduce(
                function(p,e){
                    var a = e.split('=');
                    p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );

        if (typeof params['join'] !== 'undefined') {
            this.setPopout(<ScreenSpinner />);
            this.API.Room.connect(params['join'], 1)
                .then(() => {
                    WS.toBuffer = true;
                    WS.connect();
                    this.setPopout(null);
                    this.setState({activeView: 'start', activePanel: 'wait_room'});
                });
        }

    }

    render() {
        return (
            <Root activeView={this.state.activeView}>
                <View id="start" activePanel={this.state.activePanel} popout={this.state.popout}>
                    <CheckCode id="check_code"
                               popout={this.setPopout}
                               action_done={() => this.setState({activePanel: 'start_screen'})}/>
                    <Home id="start_screen"
                          api={this.API}
                          subtitle={subtitle}
                          action_create={() => this.setState({activePanel: 'create_room'})}
                          action_rooms={() => {this.setState({activeView: 'room_list'})}}/>

                    <CreateRoom id="create_room"
                                api={this.API}
                                action_back={() => this.setState({activePanel: 'start_screen'})}
                                action_create={() => this.setState({activePanel: 'wait_room'})}
                                popout={this.setPopout}
                                showError={this.showError}/>

                    <WaitRoom id="wait_room"
                              api={this.API}
                              action_start={() => this.setState({activePanel: 'role_screen'})}
                              action_exit={() => this.setState({activePanel: 'start_screen'})}
                              popout={this.setPopout}
                              showError={this.showError}/>

                    <RoleScreen id="role_screen"
                                api={this.API}
                                action_ready={() => this.setState({activePanel: 'game_room'})}
                                showError={this.showError}/>

                    <GameRoom id="game_room"
                              api={this.API}
                              action_exit={() => this.setState({activePanel: 'start_screen'})}
                              showError={this.showError}
                              popout={this.setPopout}/>
                </View>
                <View activePanel="room_list" id="room_list" popout={this.state.popout}>
                    <RoomList id="room_list"
                              api={this.API}
                              showError={this.showError}
                              popout={this.setPopout}
                              action_connect={() => this.setState({activeView: 'start', activePanel: 'wait_room'})}
                              action_back={() => this.setState({activeView: 'start'})}/>
                </View>
            </Root>
        );
    }
}

export default App;



//Анастасия Шутова - 5a0d21625ad90f487adf27f65909b054
//Максим Бойцов - 2e2f61cb5d072cd70b9fc45c3f7bc967
//Николай Бодачевский - 3e0f26e9b1858d7cc79ff53e608e6e59
//Даниил Коликиди - be9aff399536e660caff51968d396a62
//Pahahontos Uu - ed6d0adafda5f286b9ecd0c1d3ca67e4
//Роберт Тоноян - 01afad44b696cd96a76f8ac1f2ac19c3
//Егор Токарев - 82a567127591362271ce739afda6bcf7
//Софья Юрьева - e906f11088aa391e3e388c221583075f
//Никита Аствацатурян - 98b932100fa21e2c3274470813f16590
//Руслан Магомадов - 6cab959bd93d959d75355931f78c666e
//Владислав Пузанов - 2f234b673f2a8b1d850f992800544931
//Андрей Патока - 63068ae11fa7533f72647d0cda1a53d3
//Никита Субачев - b3fcddc5c5f0eff4df7ba9fef7df3727
//Вася Худяков - d702462405fed4deb8b0cd5186258aa6
//Bogdan Volk - a59cee6e4ceabe16ca9838d01ef3c4da
//Илья Неделько - efe4c96a954caea33a44e20ed1ebac8c