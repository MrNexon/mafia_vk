import React, { Component } from 'react';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';
import IRootProps from '../IRootProps';
import ProfileCell from '../../Component/ProfileCell/ProfileCell';
import RoomCard from '../../Component/RoomCard/RoomCard';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../API/Redux/Hooks';
import GroupHeader from '../../Component/Group/Header/GroupHeader';
import CardScroll from '../../Component/CardScroll/CardScroll';
import GradientCard from '../../Component/GradientCard/GradientCard';

class Home extends Component<IRootProps> {
  constructor(props: IRootProps) {
    super(props);
  }

  render() {
    const { id, storeState } = this.props;
    return (
      <View activePanel='main' id={id}>
        <Panel id='main'>
          <PanelHeader separator={false}>Мафия</PanelHeader>
          <ProfileCell User={storeState.User} />
          <GroupHeader>Играть</GroupHeader>
          <CardScroll>
            {storeState.RoomType.RoomTypes.map((roomType) => (
              <GradientCard header={roomType.name} description={roomType.description} />
            ))}
          </CardScroll>
          <GroupHeader>Ожидают игры</GroupHeader>
          {this.props.storeState.Room.RoomList.map((room) => (
            <RoomCard Room={room} />
          ))}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
