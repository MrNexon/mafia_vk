import classnames from 'classnames';
import React, { Component } from 'react';
import './NamedGroup.scss';

interface INamedGroupProps {
  className?: string;
  header?: string;
  subheader?: string;
}

class NamedGroup extends Component<INamedGroupProps> {
  render() {
    const { children, header, subheader } = this.props;
    return (
      <div className={classnames('NamedGroup', this.props.className)}>
        {header && (
          <div className='PageMargin NamedGroup-Text'>
            <span className='NamedGroup-Header'>{header}</span>
            {subheader && <span className='NamedGroup-Subheader'>{subheader}</span>}
          </div>
        )}
        <div className='NamedGroup-Wrapper'>{children}</div>
      </div>
    );
  }
}

export default NamedGroup;
