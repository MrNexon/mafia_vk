import React, { Component } from 'react';
import { Icon28ChevronRightCircleOutline } from '@vkontakte/icons';

import './Card.scss';

class Card extends Component {
  render() {
    return (
      <div className='Card'>
        <div className='Card-Info'>
          <div className='Card-Info-Text'>
            <span className='Card-Info-Text-Header'>Городская мафия</span>
            <span className='Card-Info-Text-Subheader'>Мафия, дон, комиссар и дополнительные роли</span>
          </div>
        </div>
        <Icon28ChevronRightCircleOutline className='ExtraCard-Action' />
      </div>
    );
  }
}

export default Card;
