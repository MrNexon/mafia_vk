import React, { Component } from 'react';
import { Panel, PanelHeader, Select, View } from '@vkontakte/vkui';
import { Icon28LockOpenOutline, Icon28Users3Outline } from '@vkontakte/icons';

import ContentWrapper from '../../Component/ContentWrapper/ContentWrapper';

import AvailabilityCard from '../../Component/AvailabilityCard/AvailabilityCard';
import IRootProps from '../IRootProps';
import './CreateRoom.scss';

class CreateRoom extends Component<IRootProps> {
  render() {
    const { id } = this.props;
    return (
      <View activePanel='main' id={id}>
        <Panel id='main'>
          <PanelHeader separator={false}>Создание комнаты</PanelHeader>
          <ContentWrapper>
            <div className='PageMargin AvailabilityRow'>
              <AvailabilityCard icon={<Icon28LockOpenOutline />} text='Открытая' color='basic-orange' selected />
              <AvailabilityCard icon={<Icon28Users3Outline />} text='Друзья' color='bright-blue' />
              <AvailabilityCard icon={<Icon28LockOpenOutline />} text='Открытая' color='basic-orange' />
            </div>
            <Select
              className='PageMargin'
              placeholder='Выберите пол'
              options={[
                {
                  value: '0',
                  label: 'Мужской',
                },
                {
                  value: '1',
                  label: 'Женский',
                },
              ]}
            />
            {/* <ProfileCell />
            <ExtraCard
              header='Твои друзья уже в игре!'
              subheader='Подключайся к комнате'
              type='info'
              icon={<Icon28PlaceOutline />}
            />
            <NamedGroup header='Играть'>
              <HorizontalScroll>
                <ScrollWrapper>
                  <Card
                    header='Городская мафия'
                    subheader='Мафия, дон, комиссар и дополнительные роли'
                    color='basic-cyan'
                  />
                  <Card
                    header='Классическая мафия'
                    subheader='Мафия, дон, комиссар и ничего лишнего'
                    color='basic-brown'
                  />
                  <Card header='Турнирная мафия' subheader='Скоро' color='light-purple' />
                </ScrollWrapper>
              </HorizontalScroll>
            </NamedGroup>
            <NamedGroup header='Ожидают игры'>
              <RoomCard />
              <RoomCard />
              <RoomCard />
            </NamedGroup> */}
          </ContentWrapper>
        </Panel>
      </View>
    );
  }
}

export default CreateRoom;
