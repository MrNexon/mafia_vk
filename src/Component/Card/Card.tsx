import React, { Component } from 'react';
import { Icon28ChevronRightCircleOutline } from '@vkontakte/icons';

import './Card.scss';

interface ICardProps {
  header: string;
  subheader: string;

  color: 'basic-cyan' | 'basic-brown' | 'light-purple';
}

class Card extends Component<ICardProps> {
  render() {
    const { header, subheader, color } = this.props;
    return (
      <div className='Card' data-color={color}>
        <div className='Card-Info'>
          <div className='Card-Info-Text'>
            <span className='Card-Info-Text-Header'>{header}</span>
            <span className='Card-Info-Text-Subheader'>{subheader}</span>
          </div>
        </div>
        <Icon28ChevronRightCircleOutline className='ExtraCard-Action' />
      </div>
    );
  }
}

export default Card;
