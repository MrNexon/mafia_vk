import React, { Component } from 'react';
import { Group, HorizontalScroll, Panel, PanelHeader, View } from '@vkontakte/vkui';
import { Icon28GameOutline, Icon28PlaceOutline } from '@vkontakte/icons';

import IRootProps from '../IRootProps';
import ProfileCell from '../../Component/ProfileCell/ProfileCell';
import ContentWrapper from '../../Component/ContentWrapper/ContentWrapper';
import ExtraCard from '../../Component/ExtraCard/ExtraCard';
import NamedGroup from '../../Component/NamedGroup/NamedGroup';
import Card from '../../Component/Card/Card';
import RoomCard from '../../Component/RoomCard/RoomCard';
import ScrollWrapper from '../../Component/ScrollWrapper/ScrollWrapper';

class Home extends Component<IRootProps> {
  render() {
    const { id } = this.props;
    return (
      <View activePanel='main' id={id}>
        <Panel id='main'>
          <PanelHeader separator={false}>Мафия</PanelHeader>
          <ContentWrapper>
            <ProfileCell />
            <ExtraCard
              header='Твои друзья уже в игре!'
              subheader='Подключайся к комнате'
              type='attention'
              icon={<Icon28GameOutline />}
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
            </NamedGroup>
          </ContentWrapper>
        </Panel>
      </View>
    );
  }
}

export default Home;
