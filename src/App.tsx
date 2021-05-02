import React, { Component } from 'react';
import { Root } from '@vkontakte/vkui';
import Home from './Page/Home/Home';

class App extends Component {
  render() {
    return (
      <Root activeView='home'>
        <Home id='home' />
      </Root>
    );
  }
}

export default App;
