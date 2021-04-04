import React, { Component } from 'react';
import { Panel, View } from '@vkontakte/vkui';
import CenterPanel from '../../Layout/CenterPanel/CenterPanel';
import ButtonGroup from '../../Layout/ButtonGroup/ButtonGroup';
import { CSSTransition } from 'react-transition-group';
import Button from '../../Component/Button/Button/Button';
import Header from '../../Component/Typography/Header/Header';
import Caption from '../../Component/Typography/Caption/Caption';
import Separator from '../../Layout/Separator/Separator';
import Table from '../../Layout/Table/Table';
import { RoomWrapperPageInterface } from '../RoomWrapperPageInterface';
import { RoomUserListItemInterface } from '../../API/ws-room/interface/room-user-list-item.interface';
import { APIService } from '../../API/APIService';
import SmallFullUserCard from '../../Component/UserCard/SmallUserCard/SmallFullUserCard/SmallFullUserCard';
import './Wait.scss';
import ButtonRow from '../../Layout/ButtonRow/ButtonRow';
import { ResponseStatusInterface } from '../../API/ws-room/interface/response-status.interface';
import { OnClientDisconnectInterface } from '../../API/ws-room/interface/on-client-disconnect.interface';
import { UserStatusEnum } from '../../API/ws-room/user-status.enum';
import { OnClientReconnectInterface } from '../../API/ws-room/interface/on-client-reconnect.interface';
import ErrorScreen from '../Error/ErrorScreen';
import { Icon28Users3Outline } from '@vkontakte/icons';

interface IState {
	Users: RoomUserListItemInterface[];
	popout: React.ReactNode | null;
	test: boolean;
}

class Wait extends Component<RoomWrapperPageInterface, IState> {
	constructor(props: RoomWrapperPageInterface) {
		super(props);

		this.state = {
			Users: [],
			test: true,
			popout: null,
		};

		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		console.log('Connecting to room');
		APIService.WsRoom.on('connect-room', this.onConnectRoom.bind(this));
		APIService.WsRoom.on('users', this.onUsers.bind(this));
		APIService.WsRoom.on('connected', this.onConnected.bind(this));
		APIService.WsRoom.on('reconnected', this.onReconnected.bind(this));
		APIService.WsRoom.on('disconnected', this.onDisconnected.bind(this));
		APIService.WsRoom.on('exit', this.onExit.bind(this));

		this.connectRoom();
	}

	connectRoom() {
		this.setState({
			popout: null,
		});

		APIService.WsRoom.connect({
			id: APIService.RoomData.id,
			token: APIService.RoomData.token,
		});
	}

	onConnectRoom(status: ResponseStatusInterface) {
		if (status.status === 2) {
			this.setState({
				popout: (
					<ErrorScreen
						icon={<Icon28Users3Outline width={106} height={106} />}
						text={
							'Такой игрок уже подключен к комнате. Выйди с другого устройства и повтори попытку'
						}
						buttons={
							<ButtonGroup>
								<ButtonRow>
									<Button
										size={'l'}
										style={'outline'}
										status={'destructive'}
										onClick={this.backToMenu.bind(this)}>
										Назад
									</Button>
								</ButtonRow>
								<ButtonRow>
									<Button size={'l'} onClick={this.connectRoom.bind(this)}>
										Попробовать снова
									</Button>
								</ButtonRow>
							</ButtonGroup>
						}
					/>
				),
			});
			return;
		}

		APIService.WsRoom.users();
	}

	onUsers(users: RoomUserListItemInterface[]) {
		this.setState({
			Users: users,
		});
	}

	onConnected(data: RoomUserListItemInterface) {
		let users = [...this.state.Users];
		users.push(data);
		console.log(users);
		this.setState({
			Users: users,
		});
	}

	onReconnected(data: OnClientReconnectInterface) {
		this.setState({
			Users: this.state.Users.map((user) => {
				if (user.User.id === data.User.id)
					return {
						...user,
						status: data.status,
						confirm_start: user.confirm_start,
					};
				else return user;
			}),
		});
	}

	onDisconnected(data: OnClientDisconnectInterface) {
		this.setState({
			Users: this.state.Users.map((user) => {
				if (user.User.id === data.User.id)
					return {
						...user,
						status: UserStatusEnum.DISCONNECTED,
					};
				else return user;
			}),
		});
	}

	onExit(data: OnClientDisconnectInterface) {
		this.setState({
			Users: this.state.Users.filter((user) => {
				if (user.User.id !== data.User.id) return user;
			}),
		});
	}

	backToMenu() {
		APIService.WsRoom.disconnect();
		if (this.props.onPrevPage) this.props.onPrevPage(null);
	}

	renderUsers() {
		if (!APIService.RoomData) return;
		let ret = [];

		for (let i = 0; i < APIService.RoomData.size; i++) {
			ret.push(<SmallFullUserCard mode="wait" user={this.state.Users[i]} key={i} />);
		}

		return ret;
	}

	onPrevPage(event: any) {
		APIService.WsRoom.exit();

		if (this.props.onPrevPage) this.props.onPrevPage(event);
	}

	render() {
		return (
			<View id={this.props.id} popout={this.state.popout} activePanel="Main">
				<Panel id="Main">
					<CenterPanel
						bottom={
							<CSSTransition
								in={this.props.animation}
								appear={true}
								timeout={700}
								onExited={this.props.onAnimationEnd}
								classNames="WaitButton">
								<div>
									<ButtonGroup>
										<ButtonRow>
											<Button
												style="outline"
												status="destructive"
												onClick={this.onPrevPage.bind(this)}>
												Выйти
											</Button>
											<Button style="normal" status="primary">
												Поделиться
											</Button>
										</ButtonRow>
										<ButtonRow>
											<Button
												style="normal"
												status="success"
												size="l"
												disable={this.state.Users.length < APIService.RoomData?.size}
												/*onClick={this.props.onNextPage}*/
											>
												Начать игру
											</Button>
										</ButtonRow>
									</ButtonGroup>
								</div>
							</CSSTransition>
						}>
						<CSSTransition
							in={this.props.animation}
							appear={true}
							timeout={1500}
							classNames="WaitHeader">
							<div>
								<Header level={1}>Ожидание игроков</Header>
								<Caption level={1}>Ждем пока комната заполнится</Caption>
							</div>
						</CSSTransition>
						<Separator />
						<Table>
							<CSSTransition
								in={this.state.Users.length > 0}
								/*appear={true}*/
								timeout={1500}
								classNames="TableUsers">
								<div className="TableUsers-enter">{this.renderUsers()}</div>
							</CSSTransition>
						</Table>
					</CenterPanel>
				</Panel>
			</View>
		);
	}
}

export default Wait;
