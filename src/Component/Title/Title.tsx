import React, { Component } from 'react';
import { ITitle } from './ITitle';

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
