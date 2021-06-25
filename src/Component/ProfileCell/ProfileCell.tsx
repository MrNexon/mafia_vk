import React, { Component } from 'react';
import { Icon28UserOutgoingOutline } from '@vkontakte/icons';
import './ProfileCell.scss';
import { IProfileCellProps } from './IProfileCellProps';
import Title from '../Typography/Title/Title';
import Text from '../Typography/Text/Text';

class ProfileCell extends Component<IProfileCellProps> {
  render() {
    return (
      <div className='ProfileCell'>
        <div className='ProfileCell-Block'>
          <img src={this.props.User.avatar_src} alt='Profile Avatar' />
          <div className='ProfileCell-Info'>
            <Title level={'2'}>{this.props.User.first_name + ' ' + this.props.User.last_name}</Title>
            <Text level={'2'}>Уровень 1</Text>
          </div>
        </div>
        <div className='ProfileCell-Block'>
          <div className='ProfileCell-GoButton'>
            <Icon28UserOutgoingOutline width={22} height={22} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCell;
