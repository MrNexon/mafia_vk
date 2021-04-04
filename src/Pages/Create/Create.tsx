import React, { Component } from 'react';
import { Panel, ScreenSpinner, View } from '@vkontakte/vkui';
import CenterPanel from '../../Layout/CenterPanel/CenterPanel';
import ButtonGroup from '../../Layout/ButtonGroup/ButtonGroup';
import { CSSTransition } from 'react-transition-group';
import Button from '../../Component/Button/Button/Button';
import Header from '../../Component/Typography/Header/Header';
import Caption from '../../Component/Typography/Caption/Caption';
import Separator from '../../Layout/Separator/Separator';
import Table from '../../Layout/Table/Table';
import { RoomWrapperPageInterface } from '../RoomWrapperPageInterface';
import BoxButton from '../../Component/Button/BoxButton/BoxButton';
import './Create.scss';
import { APIService } from '../../API/APIService';

interface IState {
	count: number;
}

class Create extends Component<RoomWrapperPageInterface, IState> {
	constructor(props: RoomWrapperPageInterface) {
		super(props);

		this.state = {
			count: 0,
		};

		this.renderButtons = this.renderButtons.bind(this);
		this.onCreate = this.onCreate.bind(this);
	}

	renderButtons(count: number): React.ReactNode[] {
		let content = [];
		for (let i = 5; i <= count; i++)
			content.push(
				<BoxButton
					active={this.state.count === i}
					onClick={() => this.setState({ count: i })}
					key={i}>
					{i}
				</BoxButton>,
			);

		return content;
	}

	async onCreate(event: any) {
		this.props.setPopout(<ScreenSpinner />);

		const data = await APIService.Room.create({
			size: this.state.count,
			public: true,
		});

		if (data) {
			this.props.setPopout(null);
			this.props.onNextPage(event);
		}
	}

	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				<Panel id="Main">
					<CenterPanel
						bottom={
							<ButtonGroup>
								<CSSTransition
									in={this.props.animation}
									timeout={700}
									onExited={this.props.onAnimationEnd}
									classNames="CreateButtons">
									<div>
										<Button
											style="outline"
											status="destructive"
											onClick={this.props.onPrevPage}>
											Назад
										</Button>
										<Button
											style="normal"
											status="primary"
											disable={this.state.count < 5}
											onClick={this.onCreate}>
											Создать
										</Button>
									</div>
								</CSSTransition>
							</ButtonGroup>
						}>
						<CSSTransition
							in={this.props.animation}
							timeout={1500}
							classNames="CreateHeader">
							<div>
								<Header level={1}>Создание комнаты</Header>
								<Caption level={1}>Выберите количество игроков</Caption>
							</div>
						</CSSTransition>
						<Separator />
						<Table>
							<CSSTransition
								in={this.props.animation}
								timeout={1500}
								classNames="TableButtons">
								<div>{this.renderButtons(16)}</div>
							</CSSTransition>
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

export default Create;
