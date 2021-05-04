import React, { Component } from 'react';
import { Group, HorizontalScroll, Panel, PanelHeader, View } from '@vkontakte/vkui';
import { Icon28GameOutline } from '@vkontakte/icons';
import IRootProps from '../IRootProps';
import ProfileCell from '../../Component/ProfileCell/ProfileCell';
import ContentWrapper from '../../Component/ContentWrapper/ContentWrapper';
import ExtraCard from '../../Component/ExtraCard/ExtraCard';
import NamedGroup from '../../Component/NamedGroup/NamedGroup';
import Card from '../../Component/Card/Card';
import RoomCard from '../../Component/RoomCard/RoomCard';
import ScrollWrapper from '../../Component/ScrollWrapper/ScrollWrapper';

class Home extends Component<IRootProps, any> {
  render() {
    return (
      <View activePanel='main'>
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
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
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
