import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  HorizontalScroll,
  Input,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Select,
  SizeType,
  SliderSwitch,
} from '@vkontakte/vkui';
import { Icon24Dismiss, Icon28LockOpenOutline } from '@vkontakte/icons';

import ContentWrapper from '../../Component/ContentWrapper/ContentWrapper';

import AvailabilityCard from '../../Component/AvailabilityCard/AvailabilityCard';
import './CreateRoom.scss';
import NamedGroup from '../../Component/NamedGroup/NamedGroup';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../API/Redux/Hooks';
import ScrollWrapper from '../../Component/ScrollWrapper/ScrollWrapper';
import RoleCard from '../../Component/RoleCard/RoleCard';

class CreateRoom extends Component<{
  id: string;
}> {
  render() {
    const { id } = this.props;
    return (
      <ModalPage
        dynamicContentHeight
        settlingHeight={90}
        id={id}
        header={
          <ModalPageHeader
            right={
              <PanelHeaderButton>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }>
            Создание комнаты
          </ModalPageHeader>
        }>
        <ContentWrapper>
          <div className='PageMargin AvailabilityRow'>
            <AvailabilityCard icon={<Icon28LockOpenOutline />} text='Открытая' color='basic-orange' selected />
            {/* <AvailabilityCard icon={<Icon28Users3Outline />} text='Друзья' color='bright-blue' />
            <AvailabilityCard icon={<Icon28LockOpenOutline />} text='Открытая' color='basic-orange' />*/}
          </div>
          <NamedGroup className='PageMargin'>
            <Select
              placeholder='Количество игроков'
              options={Array(12)
                .fill(0)
                .map((value, index) => {
                  return {
                    value: index + 5,
                    label: `${index + 5} игроков`,
                  };
                })}
            />
          </NamedGroup>
          <NamedGroup className='PageMargin'>
            <SliderSwitch
              className='SliderSwitch'
              options={[
                {
                  name: 'Групповой звонок',
                  value: 'group_call',
                },
                {
                  name: 'Текстовый чат',
                  value: 'text_chat',
                },
              ]}
            />
            <Input type='text' placeholder='Ссылка' />
          </NamedGroup>
          <NamedGroup header='Роли' subheader='2 из 3 выбрано'>
            <HorizontalScroll>
              <ScrollWrapper>
                <RoleCard />
                <RoleCard />
                <RoleCard />
                <RoleCard />
              </ScrollWrapper>
            </HorizontalScroll>
          </NamedGroup>
          <NamedGroup className='PageMargin'>
            <Checkbox>Делиться геопозицией</Checkbox>
            <Checkbox>Речь после смерти</Checkbox>
          </NamedGroup>
          <Button size='l' className='PageMargin'>
            Создать игру
          </Button>
        </ContentWrapper>
      </ModalPage>
    );
  }
}

export default connect(mapStateToProps)(CreateRoom);
