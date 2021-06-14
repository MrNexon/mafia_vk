import React, { Component } from 'react';
import './RoomCard.scss';
import { UsersStack } from '@vkontakte/vkui';
import { Icon24ArrowRightOutline } from '@vkontakte/icons';
import { IRoomCardProps } from './IRoomCardProps';

class RoomCard extends Component<IRoomCardProps> {
  render() {
    return (
      <div className='PageMargin RoomCard'>
        <div className='RoomCard-Block'>
          <span className='RoomCard-Block-Name'>{this.props.Room.type}</span>
          <span className='RoomCard-Block-Number'>#{this.props.Room.id}</span>
        </div>
        <div className='RoomCard-Block'>
          <div className='RoomCard-Block-Player'>
            <UsersStack photos={['ES9P2Ws9UK8.jpg']} />
            <span>5/{this.props.Room.size} игроков</span>
          </div>

          <Icon24ArrowRightOutline className='RoomCard-Block-Icon' />
        </div>
      </div>
    );
  }
}

export default RoomCard;
