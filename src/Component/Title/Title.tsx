import React, { Component } from 'react';
import { ITitle } from './ITitle';

import './Title.scss';

class Title extends Component<ITitle> {
  render() {
    return (
      <div className='Title' data-level={this.props.level}>
        {this.props.children}
      </div>
    );
  }
}

export default Title;
