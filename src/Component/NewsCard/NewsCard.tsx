import React, { Component } from 'react';
import { Card, CardGrid } from '@vkontakte/vkui';
import './NewsCard.scss';

interface IProps {
	title: string;
	image?: string;
}

class NewsCard extends Component<IProps> {
	render() {
		return (
			<CardGrid size="l">
				<Card>
					<div className="NewsCard">
						<div className="NewsCard-Wrapper">
							<div className="NewsCard-Content">
								<div className="Content-Title">{this.props.title}</div>
								<div className="Content-Subtitle">{this.props.children}</div>
							</div>
							<div
								className="NewsCard-Image"
								style={{
									backgroundImage: `url(${this.props.image})`,
								}}
							/>
						</div>
					</div>
				</Card>
			</CardGrid>
		);
	}
}

export default NewsCard;
