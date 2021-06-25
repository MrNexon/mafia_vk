import React, { Component } from 'react';
import { IUserStack } from './IUserStack';

import './UserStack.scss';
import Text from '../Typography/Text/Text';

class UserStack extends Component<IUserStack> {
  render() {
    return (
      <div className='UserStack' data-size={this.props.size}>
        <div className='UserStack-Wrapper'>
          {this.props.avatars.map((avatar) => (
            <img src={avatar} />
          ))}
        </div>
        {typeof this.props.children === 'string' && this.props.size === 's' && (
          <Text level={'2'}>{this.props.children}</Text>
        )}
      </div>
    );
  }
}

export default UserStack;
