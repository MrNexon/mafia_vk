import React, { Component } from 'react';
import './NamedGroup.scss';

class NamedGroup extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className='NamedGroup'>
        <span className='PageMargin NamedGroup-Header'>Играть</span>
        <div className='NamedGroup-Wrapper'>{children}</div>
      </div>
    );
  }
}

export default NamedGroup;
