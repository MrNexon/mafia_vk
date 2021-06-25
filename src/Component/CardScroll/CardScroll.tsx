import React, { Component } from 'react';

import './CardScroll.scss';
import { HorizontalScroll } from '@vkontakte/vkui';
import { ICardScroll } from './ICardScroll';

class CardScroll extends Component<ICardScroll> {
  render() {
    return (
      <HorizontalScroll>
        <div className='CardScroll'>
          <div className='CardScroll-Space' />
          {this.props.children.map((card) => card)}
          <div className='CardScroll-Space' />
        </div>
      </HorizontalScroll>
    );
  }
}

export default CardScroll;
