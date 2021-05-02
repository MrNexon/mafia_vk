import React, { Component } from 'react';
import './ContentWrapper.scss';

class ContentWrapper extends Component {
  render() {
    const { children } = this.props;
    return <div className='ContentWrapper'>{children}</div>;
  }
}

export default ContentWrapper;
