import React, { Component } from 'react';
import { Icon28GameOutline, Icon28ChevronRightCircleOutline } from '@vkontakte/icons';

import './ExtraCard.scss';
import { UsersStack } from '@vkontakte/vkui';

class ExtraCard extends Component {
  render() {
    return (
      <div className='PageMargin ExtraCard'>
        <Icon28GameOutline width={139} height={139} className='ExtraCard-Icon' />
        <div className='ExtraCard-Info'>
          <div className='ExtraCard-Info-Text'>
            <span className='ExtraCard-Info-Text-Header'>Твои друзья в игре!</span>
            <span className='ExtraCard-Info-Text-Subheader'>Подключайся к комнате</span>
          </div>
          <UsersStack photos={['ES9P2Ws9UK8.jpg', 'ES9P2Ws9UK8.jpg', 'ES9P2Ws9UK8.jpg']} size='m' visibleCount={10} />
        </div>
        <Icon28ChevronRightCircleOutline className='ExtraCard-Action' />
      </div>
    );
  }
}

export default ExtraCard;
