import React, { Component } from 'react';
import { Epic, Panel, Tabbar, TabbarItem, View } from '@vkontakte/vkui';
import { Icon28GlobeOutline, Icon28MarketOutline, Icon28Play } from '@vkontakte/icons';
import Shop from '../Shop/Shop';
import Home from '../Home/Home';
import Rating from '../Rating/Rating';
import { RootPagesInterface } from '../RootPagesInterface';

interface IState {
	activeStory: 'Home' | 'Shop' | 'Rating' | string;
}

class Main extends Component<RootPagesInterface, IState> {
	constructor(props: RootPagesInterface) {
		super(props);

		this.state = {
			activeStory: this.props.activeView ? this.props.activeView : 'Home',
		};
	}

	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				<Panel id="Main">
					<Epic
						activeStory={this.state.activeStory}
						tabbar={
							<Tabbar>
								<TabbarItem
									onClick={() => this.setState({ activeStory: 'Shop' })}
									selected={this.state.activeStory === 'Shop'}>
									<Icon28MarketOutline />
								</TabbarItem>
								<TabbarItem
									onClick={() => this.setState({ activeStory: 'Home' })}
									selected={this.state.activeStory === 'Home'}>
									<Icon28Play />
								</TabbarItem>
								<TabbarItem
									onClick={() => this.setState({ activeStory: 'Rating' })}
									selected={this.state.activeStory === 'Rating'}>
									<Icon28GlobeOutline />
								</TabbarItem>
							</Tabbar>
						}>
						<Shop id="Shop" />
						<Home id="Home" onChangeView={this.props.onChangeView} />
						<Rating id="Rating" />
					</Epic>
				</Panel>
			</View>
		);
	}
}

export default Main;
