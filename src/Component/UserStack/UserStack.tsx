import React, { Component } from 'react';
import { IUserStack } from './IUserStack';

import './UserStack.scss';
import Text from '../Typography/Text/Text';

class UserStack extends Component<IUserStack> {
  render() {
    return (
      <div className='UserStack' data-size={this.props.size}>
        <div className='UserStack-Wrapper'>
          {this.props.avatars.map((avatar, index) => {
            if (index < 5) return <img src={avatar} alt='Player Avatar' />;
          })}
        </div>
        {typeof this.props.children === 'string' && this.props.size === 's' && (
          <Text level={'2'}>{this.props.children}</Text>
        )}
      </div>
    );
  }
}

export default UserStack;
