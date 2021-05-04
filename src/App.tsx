import React, { Component } from 'react';
import { Root } from '@vkontakte/vkui';
import Home from './Page/Home/Home';
import CreateRoom from './Page/CreateRoom/CreateRoom';

class App extends Component {
  render() {
    return (
      <Root activeView='create-room'>
        <Home id='home' />
        <CreateRoom id='create-room' />
      </Root>
    );
  }
}

export default App;
