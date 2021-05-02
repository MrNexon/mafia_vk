import React, { Component } from 'react';
import { HorizontalScroll, Panel, PanelHeader, View } from '@vkontakte/vkui';
import IRootProps from '../IRootProps';
import ProfileCell from '../../Component/ProfileCell/ProfileCell';
import ContentWrapper from '../../Component/ContentWrapper/ContentWrapper';
import ExtraCard from '../../Component/ExtraCard/ExtraCard';
import NamedGroup from '../../Component/NamedGroup/NamedGroup';
import Card from '../../Component/Card/Card';
import RoomCard from '../../Component/RoomCard/RoomCard';

class Home extends Component<IRootProps, any> {
  render() {
    return (
      <View activePanel='main'>
        <Panel id='main'>
          <PanelHeader separator={false}>Мафия</PanelHeader>
          <ContentWrapper>
            <ProfileCell />
            <ExtraCard />
            <NamedGroup>
              <HorizontalScroll>
                <div style={{ display: 'flex', width: 'max-content' }}>
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                </div>
              </HorizontalScroll>
            </NamedGroup>
            <NamedGroup>
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
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
