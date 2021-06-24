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
          {/*<img src={this.props.User.avatar_src} />*/}
          <img
            src={
              'https://sun9-61.userapi.com/impg/q2cDzIFVWraU11Sp0f6MxRP1Ug23wFKp-jOYpQ/I30Gpp5kWgE.jpg?size=2560x1707&quality=96&sign=2f43c78a6bcbbaa8163aabf635ee503b&type=album'
            }
          />
          <div className='ProfileCell-Info'>
            <Title level={'2'}>Ефим Беляков</Title>
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
