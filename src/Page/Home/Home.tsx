import React, { Component } from 'react';
import { HorizontalScroll, Panel, PanelHeader, View } from '@vkontakte/vkui';
import { Icon28GameOutline } from '@vkontakte/icons';

import IRootProps from '../IRootProps';
import ProfileCell from '../../Component/ProfileCell/ProfileCell';
import ContentWrapper from '../../Component/ContentWrapper/ContentWrapper';
import ExtraCard from '../../Component/ExtraCard/ExtraCard';
import NamedGroup from '../../Component/NamedGroup/NamedGroup';
import Card from '../../Component/Card/Card';
import RoomCard from '../../Component/RoomCard/RoomCard';
import ScrollWrapper from '../../Component/ScrollWrapper/ScrollWrapper';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../API/Redux/Hooks';

class Home extends Component<IRootProps> {
  render() {
    const { id, storeState } = this.props;
    return (
      <View activePanel='main' id={id}>
        <Panel id='main'>
          <PanelHeader separator={false}>Мафия</PanelHeader>
          <ContentWrapper>
            <ProfileCell User={storeState.User} />
            <ExtraCard
              header='Твои друзья уже в игре!'
              subheader='Подключайся к комнате'
              type='attention'
              icon={<Icon28GameOutline />}
            />
            <NamedGroup header='Играть'>
              <HorizontalScroll>
                <ScrollWrapper>
                  {storeState.RoomType.RoomTypes.map((roomType) => {
                    return <Card header={roomType.name} subheader={roomType.description} color='basic-cyan' />;
                  })}
                  {/*<Card
                    header='Городская мафия'
                    subheader='Мафия, дон, комиссар и дополнительные роли'
                    color='basic-cyan'
                  />
                  <Card
                    header='Классическая мафия'
                    subheader='Мафия, дон, комиссар и ничего лишнего'
                    color='basic-brown'
                  />
                  <Card header='Турнирная мафия' subheader='Скоро' color='light-purple' />*/}
                </ScrollWrapper>
              </HorizontalScroll>
            </NamedGroup>
            <NamedGroup header='Ожидают игры'>
              {this.props.storeState.Room.RoomList.map((room, index) => {
                return <RoomCard Room={room} key={index} />;
              })}
            </NamedGroup>
          </ContentWrapper>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
