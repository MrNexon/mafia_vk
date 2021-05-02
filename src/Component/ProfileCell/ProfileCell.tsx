import React, { Component } from 'react';
import { Icon28UserOutgoingOutline } from '@vkontakte/icons';
import './ProfileCell.scss';

class ProfileCell extends Component {
  render() {
    return (
      <div className='ProfileCell'>
        <div className='ProfileCell-Block'>
          <img src='ES9P2Ws9UK8.jpg' />
          <div className='ProfileCell-Info'>
            <span className='ProfileCell-Info-Name'>Ефим Беляков</span>
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
