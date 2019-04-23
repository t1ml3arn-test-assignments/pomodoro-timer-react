import React, { Component } from 'react';
import './App.css';
import TimerSetup from './TimerSetup'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      breakTime: 5,
      sessionTime: 25,
    }
  }

  setBreakTime = time => this.setState({ breakTime: time })
  setSessionTime = time => this.setState({ sessionTime: time })

  render() {

    const {sessionTime, breakTime} = this.state

    return (
      <div className="App">
        <TimerSetup timerType="Session time" time={ sessionTime } setTime={ this.setSessionTime } />
        <TimerSetup timerType="Break time" time={ breakTime }  setTime={ this.setBreakTime } />
      </div>
    );
  }
}

export default App;
