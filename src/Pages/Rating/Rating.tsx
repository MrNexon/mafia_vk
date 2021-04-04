import React, { Component } from 'react';
import { Panel, PanelHeader, Placeholder, View } from '@vkontakte/vkui';
import { Icon56Users3Outline } from '@vkontakte/icons';

interface IProps {
	id: string;
}

class Rating extends Component<IProps> {
	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				<Panel id="Main">
					<PanelHeader>Топ</PanelHeader>
					<Placeholder
						icon={<Icon56Users3Outline width={56} height={56} />}
						header="Мы не девочки">
						Мы не носим топики, они как минимум нам не подходят. Хотя кто знает, что будет
						дальше
					</Placeholder>
				</Panel>
			</View>
		);
	}
}

export default Rating;
