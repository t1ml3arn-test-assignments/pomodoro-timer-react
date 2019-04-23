import React, { Component } from 'react';
import './App.css';
import TimerSetup from './TimerSetup'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimerSetup timerType="Session time" time={25} />
        <TimerSetup timerType="Break time" time={5} />
      </div>
    );
  }
}

export default App;
