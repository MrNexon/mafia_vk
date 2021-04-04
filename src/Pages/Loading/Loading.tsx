import React, { Component } from 'react';
import { Panel, View } from '@vkontakte/vkui';
import Header from '../../Component/Typography/Header/Header';
import CenterPanel from '../../Layout/CenterPanel/CenterPanel';
import Caption from '../../Component/Typography/Caption/Caption';
import Table from '../../Layout/Table/Table';
import Button from '../../Component/Button/Button/Button';
import BoxButton from '../../Component/Button/BoxButton/BoxButton';
import SmallFullUserCard from '../../Component/UserCard/SmallUserCard/SmallFullUserCard/SmallFullUserCard';
import ButtonGroup from '../../Layout/ButtonGroup/ButtonGroup';
import Separator from '../../Layout/Separator/Separator';
import { CSSTransition } from 'react-transition-group';
import { RootPagesInterface } from '../RootPagesInterface';
import './Loading.scss';

interface IState {
	count: number;
	animation: boolean;
}

class Loading extends Component<RootPagesInterface, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			count: 0,
			animation: false,
		};
	}

	renderButtons(count: number) {
		let content = [];
		for (let i = 5; i <= count; i++)
			content.push(
				<BoxButton
					active={this.state.count === i}
					onClick={() => this.setState({ count: i })}>
					{i}
				</BoxButton>,
			);

		return content;
	}

	renderUsers(count: number) {
		let content = [];
		for (let i = 2; i <= count; i++)
			content.push(
				<SmallFullUserCard
					mode="wait"
					selection={Math.pow(-1, i) === 1 ? 'step' : 'none'}
					/*active={this.state.count === i}
					onClick={() => this.setState({ count: i })}*/
				>
					{i}
				</SmallFullUserCard>,
			);

		return content;
	}

	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				{/*<Panel id="Main">
					<CenterPanel>
						<Spinner size="regular" style={{ margin: '20px 0' }} />
						<Header level={2}>Подключаемся к внеземным технологиям...</Header>
					</CenterPanel>
				</Panel>*/}

				<Panel id="Main">
					<CenterPanel
						bottom={
							<ButtonGroup>
								<CSSTransition
									in={this.state.animation}
									timeout={1500}
									classNames="buttons">
									<div>
										<Button
											style="outline"
											status="destructive"
											onClick={() => this.setState({ animation: false })}>
											Назад
										</Button>
										<Button
											style="normal"
											status="primary"
											onClick={() => this.setState({ animation: true })}>
											Создать
										</Button>
									</div>
								</CSSTransition>
							</ButtonGroup>
						}>
						<CSSTransition in={this.state.animation} timeout={1500} classNames="text">
							<div>
								<Header level={1}>Создание комнаты</Header>
								<Caption level={1}>Выберите количество игроков</Caption>
							</div>
						</CSSTransition>
						<Separator />
						<Table>
							<CSSTransition in={this.state.animation} timeout={1500} classNames="alert">
								<div className="alert-enter">{this.renderButtons(16)}</div>
							</CSSTransition>
							{/*<Animator namespace="PopIn" animation={this.state.animation}>*/}

							{/*</Animator>*/}
						</Table>
						{/*<Table>{this.renderUsers(7)}</Table>*/}
						{/*<Subhead weight="bold" style={{marginTop: 20}}>Открытая</Subhead>
						<Switch defaultChecked onClick={(event) => this.setState({publish: event.target.checked})} style={{display: 'inline-block', marginTop: 10}}/>*/}
					</CenterPanel>
				</Panel>
			</View>
		);
	}
}

export default Loading;
