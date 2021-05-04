import React, { Component, ReactNode } from 'react';
import './AvailabilityCard.scss';
import classNames from 'classnames';

interface IAvailabilityCardProps {
  icon: ReactNode;
  text: string;
  color: 'basic-orange' | 'bright-blue';
  selected?: boolean;
}

class AvailabilityCard extends Component<IAvailabilityCardProps> {
  render() {
    const { text, icon, color, selected } = this.props;
    const className = classNames('AvailabilityCard', {
      AvailabilityCard_select: selected,
    });
    return (
      <div className={className} data-color={color}>
        <div className='AvailabilityCard-Icon'>{icon}</div>
        <span>{text}</span>
      </div>
    );
  }
}

export default AvailabilityCard;
