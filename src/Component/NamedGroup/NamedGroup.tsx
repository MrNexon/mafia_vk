import React, { Component } from 'react';
import './NamedGroup.scss';

interface INamedGroupProps {
  header: string;
  subheader?: string;
}

class NamedGroup extends Component<INamedGroupProps> {
  render() {
    const { children, header, subheader } = this.props;
    return (
      <div className='NamedGroup'>
        <div className='PageMargin NamedGroup-Text'>
          <span className='NamedGroup-Header'>{header}</span>
          {subheader && <span className='NamedGroup-Subheader'>{subheader}</span>}
        </div>
        <div className='NamedGroup-Wrapper'>{children}</div>
      </div>
    );
  }
}

export default NamedGroup;
