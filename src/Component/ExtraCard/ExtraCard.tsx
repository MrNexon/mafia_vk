import React, { Component } from 'react';

import { Icon28ChevronRightCircleOutline } from '@vkontakte/icons';

import './ExtraCard.scss';
import { IExtraCardProps } from './IExtraCardProps';
import Title from '../Typography/Title/Title';
import Text from '../Typography/Text/Text';

class ExtraCard extends Component<IExtraCardProps> {
  render() {
    const { header, subheader, color, icon } = this.props;
    return (
      <div className='ExtraCard' data-color={color}>
        <div className='ExtraCard-Wrapper'>
          <div className='ExtraCard-Wrapper-Icon'>{icon}</div>
          <div className='ExtraCard-Wrapper-Info'>
            <div className='ExtraCard-Wrapper-Info-Text'>
              <Title level={'2'}>{header}</Title>
              <Text level={'2'}>{subheader}</Text>
            </div>
            {/*<UsersStack photos={['ES9P2Ws9UK8.jpg', 'ES9P2Ws9UK8.jpg', 'ES9P2Ws9UK8.jpg']} size='m' visibleCount={10} />*/}
          </div>
          <Icon28ChevronRightCircleOutline className='ExtraCard-Action' />
        </div>
      </div>
    );
  }
}

export default ExtraCard;
