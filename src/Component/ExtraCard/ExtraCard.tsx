import React, { Component, ReactNode } from 'react';

import { UsersStack } from '@vkontakte/vkui';
import { Icon28ChevronRightCircleOutline } from '@vkontakte/icons';

import './ExtraCard.scss';

interface IExtraCardProps {
  header: string;
  subheader: string;
  type: 'attention' | 'info';
  icon: ReactNode;
}

class ExtraCard extends Component<IExtraCardProps> {
  render() {
    const { header, subheader, type, icon } = this.props;
    return (
      <div className='PageMargin ExtraCard' data-type={type}>
        <div className='ExtraCard-Icon'>{icon}</div>
        <div className='ExtraCard-Info'>
          <div className='ExtraCard-Info-Text'>
            <span className='ExtraCard-Info-Text-Header'>{header}</span>
            <span className='ExtraCard-Info-Text-Subheader'>{subheader}</span>
          </div>
          <UsersStack photos={['ES9P2Ws9UK8.jpg', 'ES9P2Ws9UK8.jpg', 'ES9P2Ws9UK8.jpg']} size='m' visibleCount={10} />
        </div>
        <Icon28ChevronRightCircleOutline className='ExtraCard-Action' />
      </div>
    );
  }
}

export default ExtraCard;
