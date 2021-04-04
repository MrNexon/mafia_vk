import React, { Component } from 'react';
import {
	Avatar,
	CardGrid,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderContent,
	View,
} from '@vkontakte/vkui';
import Header from '../../Component/Typography/Header/Header';
import CardRow from '../../Layout/CardRow/CardRow';
import {
	Icon28ArticleOutline,
	Icon28BlockOutline,
	Icon28GameOutline,
} from '@vkontakte/icons';
import StatisticCard from '../../Component/StatisticCard/StatisticCard';
import LargeButton from '../../Component/Button/LargeButton/LargeButton';
import './Home.scss';
import { APIService } from '../../API/APIService';
import { RootPagesInterface } from '../RootPagesInterface';

class Home extends Component<RootPagesInterface> {
	constructor(props: RootPagesInterface) {
		super(props);
	}
	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				<Panel id="Main">
					<PanelHeader>
						{APIService.UserData && (
							<PanelHeaderContent
								before={<Avatar size={32} src={APIService.UserData.avatar} />}>
								{`${APIService.UserData.first_name} ${APIService.UserData.last_name}`}
							</PanelHeaderContent>
						)}
					</PanelHeader>

					{/*

					<Group separator="hide" header={<Header level={2}>Ваааауу!</Header>}>
						<NewsCard title={'Обновление!'}>
							Новая, доработанная мафия уже перед вами!
						</NewsCard>
					</Group>
*/}

					<Group separator="hide" header={<Header level={2}>Статистика</Header>}>
						<CardGrid style={{ marginTop: 0 }} size="s">
							<CardRow>
								<StatisticCard
									value={'--'}
									icon={
										<Icon28BlockOutline
											height={24}
											width={24}
											style={{ color: '#EB5757' }}
										/>
									}>
									Не доступно
								</StatisticCard>
								<StatisticCard
									value={'--'}
									icon={
										<Icon28BlockOutline
											height={24}
											width={24}
											style={{ color: '#EB5757' }}
										/>
									}>
									Не доступно
								</StatisticCard>
							</CardRow>
							<CardRow>
								<StatisticCard
									value={'--'}
									icon={
										<Icon28BlockOutline
											height={24}
											width={24}
											style={{ color: '#EB5757' }}
										/>
									}>
									Не доступно
								</StatisticCard>
								<StatisticCard
									value={'--'}
									icon={
										<Icon28BlockOutline
											height={24}
											width={24}
											style={{ color: '#EB5757' }}
										/>
									}>
									Не доступно
								</StatisticCard>
							</CardRow>
							<CardRow>
								<StatisticCard
									value={'--'}
									icon={
										<Icon28BlockOutline
											height={24}
											width={24}
											style={{ color: '#EB5757' }}
										/>
									}>
									Не доступно
								</StatisticCard>
								<StatisticCard
									value={'--'}
									icon={
										<Icon28BlockOutline
											height={24}
											width={24}
											style={{ color: '#EB5757' }}
										/>
									}>
									Не доступно
								</StatisticCard>
							</CardRow>
						</CardGrid>
					</Group>

					<Group separator="hide">
						<CardGrid size="l" className="ButtonGrid">
							<LargeButton
								onClick={() => this.props.onChangeView('Room')}
								icon={<Icon28GameOutline />}>
								Играть
							</LargeButton>
							<LargeButton
								onClick={() => this.props.onChangeView('RoomList')}
								icon={<Icon28ArticleOutline />}>
								Комнаты
							</LargeButton>
						</CardGrid>
					</Group>
				</Panel>
			</View>
		);
	}
}

export default Home;
