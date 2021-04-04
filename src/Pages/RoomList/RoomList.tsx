import React, { Component } from 'react';
import {
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Placeholder,
	PullToRefresh,
	View,
} from '@vkontakte/vkui';
import { RootPagesInterface } from '../RootPagesInterface';
import Caption from '../../Component/Typography/Caption/Caption';
import { RoomPublicItemInterface } from '../../API/room/interface/room-public-item.interface';
import SmallShortUserCard from '../../Component/UserCard/SmallUserCard/SmallShortUserCard/SmallShortUserCard';
import { APIService } from '../../API/APIService';
import './RoomList.scss';

interface IState {
	fetching: boolean;
	Rooms: RoomPublicItemInterface[];
}

class RoomList extends Component<RootPagesInterface, IState> {
	constructor(props: RootPagesInterface) {
		super(props);

		this.state = {
			fetching: false,
			Rooms: [],
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.updateRoomList = this.updateRoomList.bind(this);
		this.onConnect = this.onConnect.bind(this);
	}

	async componentDidMount() {
		await this.updateRoomList();
	}

	async updateRoomList() {
		this.setState({
			fetching: true,
		});

		const rooms = await APIService.Room.list();

		this.setState({
			fetching: false,
			Rooms: rooms,
		});
	}

	renderRoomCards() {
		let content = [];

		/*if (this.state.Rooms.length < 1 && this.state.fetching)
			content.push(<PanelSpinner />);
		else*/ if (
			this.state.Rooms.length < 1 &&
			!this.state.fetching
		) {
			content.push(<Placeholder>Пока нет открытых комнат, будь первым!</Placeholder>);
		} else
			this.state.Rooms.forEach((room, i) => {
				content.push(this.renderRoomGroup(room, i));
			});

		return content;
	}

	renderRoomGroup(room: RoomPublicItemInterface, key: number) {
		let content = [];
		content.push(
			<Group className="RoomGroup-Wrapper" key={key}>
				<Caption level={1} className="RoomGroup-Header">
					Комната #{room.id}
				</Caption>
				<div className="RoomGroup-Players">{this.renderRoomEntity(room)}</div>
			</Group>,
		);

		return content;
	}

	renderRoomEntity(data: RoomPublicItemInterface) {
		let content = [];

		for (let i = 0; i < data.size; i++) {
			content.push(
				<SmallShortUserCard
					user={data.RoomUser[i]}
					key={i}
					onClick={() => this.onConnect(data)}
				/>,
			);
		}

		return content;
	}

	onConnect(room: RoomPublicItemInterface) {
		const { RoomUser, ...data } = room;
		APIService.RoomData = data;
		this.props.onChangeView('Room', 'Wait');
	}

	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				<Panel id="Main">
					<PanelHeader
						left={<PanelHeaderBack onClick={() => this.props.onChangeView('Main')} />}>
						Комнаты
					</PanelHeader>
					<PullToRefresh onRefresh={this.updateRoomList} isFetching={this.state.fetching}>
						{this.renderRoomCards()}
					</PullToRefresh>
				</Panel>
			</View>
		);
	}
}

export default RoomList;
