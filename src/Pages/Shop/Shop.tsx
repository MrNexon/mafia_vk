import React, { Component } from 'react';
import { Panel, PanelHeader, Placeholder, View } from '@vkontakte/vkui';
import { Icon28EmployeeOutline } from '@vkontakte/icons';

interface IProps {
	id: string;
}

class Shop extends Component<IProps> {
	render() {
		return (
			<View id={this.props.id} activePanel="Main">
				<Panel id="Main">
					<PanelHeader>Магазин</PanelHeader>
					<Placeholder
						icon={<Icon28EmployeeOutline width={56} height={56} />}
						header={
							<p>
								Бжж бжж тр тр тр вжжжжжж
								<br />
								*звуки строительства*
							</p>
						}>
						Магазин закрылся на ремонт, приходите позже
					</Placeholder>
				</Panel>
			</View>
		);
	}
}

export default Shop;
