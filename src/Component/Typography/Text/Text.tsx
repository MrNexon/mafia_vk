import React, { Component } from 'react';

import '../Typography.scss';
import './Text.scss';
import { IText } from './IText';
import classNames from 'classnames';

class Text extends Component<IText> {
  render() {
    return (
      <div className={classNames('Typography Text', this.props.className)} data-level={this.props.level}>
        {this.props.children}
      </div>
    );
  }
}

export default Text;
