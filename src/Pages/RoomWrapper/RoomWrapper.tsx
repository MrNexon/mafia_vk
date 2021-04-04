import React, { Component } from 'react';
import { Epic, Panel, View } from '@vkontakte/vkui';
import Create from '../Create/Create';
import { RootPagesInterface } from '../RootPagesInterface';
import Wait from '../Wait/Wait';

export type Pages = 'Create' | 'Wait' | 'Role';

interface IState {
	animation: boolean | undefined;
	activePage: Pages | string;
	popout: React.ReactNode;
}

class RoomWrapper extends Component<RootPagesInterface, IState> {
	constructor(props: RootPagesInterface) {
		super(props);
		console.log(this.props.activeView);

		this.state = {
			activePage: this.props.activeView ? this.props.activeView : 'Create',
			animation: true,
			popout: null,
		};

		this.onNextPage = this.onNextPage.bind(this);
		this.onAnimationEnd = this.onAnimationEnd.bind(this);
		this.onPopout = this.onPopout.bind(this);
	}
	//TODO Акиму на победу "Атомная бомба"

	onNextPage() {
		this.setState({
			animation: false,
		});
	}

	onAnimationEnd(page: Pages) {
		this.setState({
			animation: true,
			activePage: page,
		});
	}

	onPopout(node: React.ReactNode) {
		this.setState({
			popout: node,
		});
	}

	render() {
		return (
			<View id={this.props.id} popout={this.state.popout} activePanel="Main">
				<Panel id="Main">
					<Epic activeStory={this.state.activePage}>
						<Create
							animation={this.state.animation}
							id="Create"
							onPrevPage={() => this.props.onChangeView('Main')}
							onNextPage={this.onNextPage}
							onAnimationEnd={() => this.onAnimationEnd('Wait')}
							setPopout={this.onPopout}
						/>
						<Wait
							animation={this.state.animation}
							id="Wait"
							onPrevPage={() => this.props.onChangeView('Main')}
							onNextPage={this.onNextPage}
							onAnimationEnd={() => this.onAnimationEnd('Role')}
							setPopout={this.onPopout}
						/>
					</Epic>
				</Panel>
			</View>
		);
	}
}

export default RoomWrapper;
