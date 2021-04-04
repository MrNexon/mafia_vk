import React, { Component } from 'react';
import { Root, ScreenSpinner } from '@vkontakte/vkui';
import Main from './Pages/Main/Main';
import Loading from './Pages/Loading/Loading';
import { APIService } from './API/APIService';
import RoomWrapper from './Pages/RoomWrapper/RoomWrapper';
import RoomList from './Pages/RoomList/RoomList';
import ErrorScreen from './Pages/Error/ErrorScreen';
import { Icon24ErrorCircleOutline } from '@vkontakte/icons';
import ButtonGroup from './Layout/ButtonGroup/ButtonGroup';
import ButtonRow from './Layout/ButtonRow/ButtonRow';
import Button from './Component/Button/Button/Button';
import { Icon28GameOutline } from '@vkontakte/icons';

interface IState {
	activeView: 'Loading' | 'Main' | 'Room' | 'RoomList';
	childView?: string;
	popout: React.ReactNode | null;
}

class App extends Component<any, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			activeView: 'Main',
			popout: <ScreenSpinner />,
		};

		this.onChangeView = this.onChangeView.bind(this);
		this.activeRoom = this.activeRoom.bind(this);
	}

	componentDidMount() {
		this.initApp().then();
	}

	async initApp() {
		this.setState({
			popout: <ScreenSpinner />,
		});

		try {
			await APIService.AuthApp.login();
			await this.activeRoom();
		} catch (e) {
			console.log(e);
			this.setState({
				popout: (
					<ErrorScreen
						icon={<Icon24ErrorCircleOutline width={106} height={106} />}
						text={
							'Упппс... Ошибка подключения к серверу. ' +
							'Возможно он перегружен или выключен. ' +
							'Повторите попытку позже или напишите нам об ошибке'
						}
						buttons={
							<ButtonGroup>
								<ButtonRow>
									<Button size={'l'} onClick={this.initApp.bind(this)}>
										Попробовать снова
									</Button>
								</ButtonRow>
							</ButtonGroup>
						}
					/>
				),
			});
		}
	}

	async activeRoom() {
		const activeRoom = await APIService.Room.active();
		this.setState({
			popout: null,
		});
		if (activeRoom)
			this.setState({
				popout: (
					<ErrorScreen
						icon={<Icon28GameOutline width={106} height={106} />}
						text={'Ты все еще в комнате'}
						buttons={
							<ButtonGroup>
								<ButtonRow>
									<Button
										onClick={() => {
											APIService.RoomData = activeRoom;
											this.onChangeView('Room', 'Wait');
											this.setState({
												popout: null,
											});
										}}>
										Переподключиться
									</Button>
								</ButtonRow>
							</ButtonGroup>
						}
					/>
				),
			});
	}

	onChangeView(toView: 'Loading' | 'Main' | 'Room' | 'RoomList', activeView?: string) {
		this.setState({
			activeView: toView,
			childView: activeView,
		});
	}

	render() {
		return (
			<Root popout={this.state.popout} activeView={this.state.activeView}>
				<Loading id="Loading" onChangeView={this.onChangeView} />
				<Main
					id="Main"
					activeView={this.state.childView}
					onChangeView={this.onChangeView}
				/>
				<RoomWrapper
					id="Room"
					activeView={this.state.childView}
					onChangeView={this.onChangeView}
				/>
				<RoomList id="RoomList" onChangeView={this.onChangeView} />
			</Root>
		);
	}
}

export default App;
