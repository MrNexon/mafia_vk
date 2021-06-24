import React, { Component } from 'react';
import Title from '../../Typography/Title/Title';
import { IGroupHeader } from './IGroupHeader';

import './GroupHeader.scss';

class GroupHeader extends Component<IGroupHeader> {
  render() {
    return (
      <div className='GroupHeader'>
        <Title level={'1'}>{this.props.children}</Title>
      </div>
    );
  }
}

export default GroupHeader;
