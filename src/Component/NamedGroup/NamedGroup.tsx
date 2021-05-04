import React, { Component } from 'react';
import './NamedGroup.scss';

interface INamedGroupProps {
  header: string;
}

class NamedGroup extends Component<INamedGroupProps> {
  render() {
    const { children, header } = this.props;
    return (
      <div className='NamedGroup'>
        <span className='PageMargin NamedGroup-Header'>{header}</span>
        <div className='NamedGroup-Wrapper'>{children}</div>
      </div>
    );
  }
}

export default NamedGroup;
