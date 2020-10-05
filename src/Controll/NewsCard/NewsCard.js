import React, {Component} from 'react';
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";

import './NewsCard.scss';

class NewsCard extends Component {
    render() {
        return (
            <CardGrid>
                <Card size="l">
                    <div className="NewsCard">
                        <div className="NewsCard-Wrapper">
                            <div className="NewsCard-Content">
                                <div className="Content-Title">{this.props.title}</div>
                                <div className="Content-Subtitle">{this.props.children}</div>
                            </div>
                            <div className="NewsCard-Image" style={{
                                backgroundImage: 'url(' + this.props.image + ')'
                            }
                            }/>
                        </div>
                    </div>
                </Card>
            </CardGrid>


        );
    }
}

export default NewsCard;