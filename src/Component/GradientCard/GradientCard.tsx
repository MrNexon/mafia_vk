import React, { Component } from 'react';
import Title from '../Typography/Title/Title';
import Text from '../Typography/Text/Text';
import { IGradientCard } from './IGradientCard';

import './GradientCard.scss';
import { Icon28ChevronRightCircleOutline } from '@vkontakte/icons';

class GradientCard extends Component<IGradientCard> {
  render() {
    return (
      <div className='GradientCard'>
        <div className='GradientCard-Wrapper'>
          <div className='GradientCard-Wrapper-Content'>
            <Title level={'2'}>{this.props.header}</Title>
            <Text level={'1'}>{this.props.description}</Text>
          </div>
          <div className='GradientCard-Wrapper-Action'>
            <Icon28ChevronRightCircleOutline className='ExtraCard-Action' />
          </div>
        </div>
      </div>
    );
  }
}

export default GradientCard;
