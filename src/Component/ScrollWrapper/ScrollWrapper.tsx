import React, { Component } from 'react';
import './ScrollWrapper.scss';

class ScrollWrapper extends Component {
  render() {
    const { children } = this.props;
    return <div className='ScrollWrapper'>{children}</div>;
  }
}

export default ScrollWrapper;
