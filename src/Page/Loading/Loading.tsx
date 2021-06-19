import React, { Component } from 'react';
import IRootProps from '../IRootProps';
import { Panel, View } from '@vkontakte/vkui';
import { mapStateToProps } from '../../API/Redux/Hooks';
import { connect } from 'react-redux';
import { AuthActionCreator } from '../../API/Auth/AuthActionCreator';
import { UserActionCreator } from '../../API/User/UserActionCreator';
import { RoomActionCreator } from '../../API/Room/RoomActionCreator';
import { SocketActionCreator } from '../../API/Socket/SocketActionCreator';
import { RoomTypeActionCreator } from '../../API/RoomType/RoomTypeActionCreator';

interface ILoadingState {
  loadingText: string;
}

class Loading extends Component<IRootProps, ILoadingState> {
  constructor(props: IRootProps) {
    super(props);

    this.state = {
      loadingText: 'Загрузка...',
    };
  }

  componentDidMount() {
    this.auth().then();
  }

  async auth() {
    const { dispatch } = this.props;

    try {
      await dispatch(AuthActionCreator.app(window.location.search));
      await dispatch(SocketActionCreator.auth());
      await dispatch(UserActionCreator.get());
      await dispatch(RoomTypeActionCreator.list());
      await dispatch(RoomActionCreator.list());

      this.props.setView('home');
    } catch (e) {
      const er = e as Error;
      this.setState({
        loadingText: 'Ошибка загрузки: ' + er.message,
      });
    }
  }

  render() {
    const { id } = this.props;
    return (
      <View activePanel='main' id={id}>
        <Panel id='main'>
          <h1>{this.state.loadingText}</h1>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Loading);
