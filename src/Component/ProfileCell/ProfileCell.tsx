import React, { Component } from 'react';
import { Icon28UserOutgoingOutline } from '@vkontakte/icons';
import './ProfileCell.scss';
import { IProfileCellProps } from './IProfileCellProps';

class ProfileCell extends Component<IProfileCellProps> {
  render() {
    return (
      <div className='PageMargin ProfileCell'>
        <div className='ProfileCell-Block'>
          <img src={this.props.User.avatar_src} />
          <div className='ProfileCell-Info'>
            <span className='ProfileCell-Info-Name'>{`${this.props.User.first_name} ${this.props.User.last_name}`}</span>
            <span className='ProfileCell-Info-Level'>Уровень 1</span>
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
