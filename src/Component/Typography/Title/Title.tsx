import React, { Component } from 'react';
import { ITitle } from './ITitle';

import '../Typography.scss';
import './Title.scss';
import classNames from 'classnames';

class Title extends Component<ITitle> {
  render() {
    return (
      <div className={classNames('Typography Title', this.props.className)} data-level={this.props.level}>
        {this.props.children}
      </div>
    );
  }
}

export default Title;
