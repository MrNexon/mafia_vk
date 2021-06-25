import React, { Component } from 'react';
import './RoomCard.scss';
import { Icon24ArrowRightOutline } from '@vkontakte/icons';
import { IRoomCardProps } from './IRoomCardProps';
import UserStack from '../UserStack/UserStack';
import Text from '../Typography/Text/Text';

class RoomCard extends Component<IRoomCardProps> {
  render() {
    return (
      <div className='RoomCard'>
        <div className='RoomCard-Wrapper'>
          <div className='RoomCard-Wrapper-Block'>
            <Text level={'1'}>{this.props.Room.RoomType.name.split(' ')[0]}</Text>
            <Text level={'2'} className={'RoomCard-Wrapper-Block-Number'}>{`#${this.props.Room.id}`}</Text>
          </div>
          <div className='RoomCard-Wrapper-Block'>
            <UserStack size={'s'} avatars={this.props.Room.RoomUser.map((roomUser) => roomUser.User.avatar_src)}>
              {this.props.Room.RoomUser.length > 0
                ? `${this.props.Room.RoomUser.length} / ${this.props.Room.size} игроков`
                : 'Нет игроков'}
            </UserStack>

            <Icon24ArrowRightOutline className='RoomCard-Wrapper-Block-Icon' />
          </div>
        </div>
      </div>
    );
  }
}

export default RoomCard;
