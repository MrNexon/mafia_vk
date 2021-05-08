import React, { Component } from 'react';
import './RoleCard.scss';

class RoleCard extends Component {
  render() {
    return (
      <div className='RoleCard'>
        <div className='RoleCard-Checkbox RoleCard-Checkbox_add' />
        <img className='RoleCard-Icon' src='icons/role_werewolf.svg' />
        <div className='RoleCard-Text'>
          <span className='RoleCard-Text-Name'>Оборотень</span>
          <span className='RoleCard-Text-Description'>Описание роли описание</span>
        </div>
      </div>
    );
  }
}

export default RoleCard;
