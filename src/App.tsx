import React, { Component } from 'react';
import { Root } from '@vkontakte/vkui';
import Home from './Page/Home/Home';
import CreateRoom from './Page/CreateRoom/CreateRoom';
import Loading from './Page/Loading/Loading';

export type AppActiveViewType = 'loading' | 'home' | 'create-room';

interface IAppRootState {
  activeView: AppActiveViewType;
}

class App extends Component<any, IAppRootState> {
  constructor(props: any) {
    super(props);

    this.state = {
      activeView: 'loading',
    };

    this.setView = this.setView.bind(this);
  }

  setView(view: AppActiveViewType) {
    this.setState({
      activeView: view,
    });
  }

  render() {
    return (
      <Root activeView={this.state.activeView}>
        <Loading id='loading' setView={this.setView} />
        <Home id='home' setView={this.setView} />
        <CreateRoom id='create-room' setView={this.setView} />
      </Root>
    );
  }
}

export default App;
