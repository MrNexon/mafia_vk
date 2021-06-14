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
          <span className='RoomCard-Block-Name'>{this.props.Room.RoomType.name.split(' ')[0]}</span>
          <span className='RoomCard-Block-Number'>#{this.props.Room.id}</span>
        </div>
        <div className='RoomCard-Block'>
          <div className='RoomCard-Block-Player'>
            <UsersStack photos={this.props.Room.RoomUser.map((roomUser) => roomUser.User.avatar_src)} />
            <span>
              {this.props.Room.RoomUser.length}/{this.props.Room.size} игроков
            </span>
          </div>

          <Icon24ArrowRightOutline className='RoomCard-Block-Icon' />
        </div>
      </div>
    );
  }
}

export default RoomCard;
