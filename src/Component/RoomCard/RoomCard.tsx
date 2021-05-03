import React, { Component } from 'react';
import './RoomCard.scss';
import { UsersStack } from '@vkontakte/vkui';
import { Icon24ArrowRightOutline } from '@vkontakte/icons';

class RoomCard extends Component {
  render() {
    return (
      <div className='PageMargin RoomCard'>
        <div className='RoomCard-Block'>
          <span className='RoomCard-Block-Name'>Городская</span>
          <span className='RoomCard-Block-Number'>#1231231</span>
        </div>
        <div className='RoomCard-Block'>
          <div className='RoomCard-Block-Player'>
            <UsersStack photos={['ES9P2Ws9UK8.jpg']} />
            <span>5/12 игроков</span>
          </div>

          <Icon24ArrowRightOutline className='RoomCard-Block-Icon' />
        </div>
      </div>
    );
  }
}

export default RoomCard;
