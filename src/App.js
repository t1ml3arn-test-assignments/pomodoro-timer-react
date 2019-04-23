import React, { Component } from 'react';
import './App.css';
import TimerSetup from './TimerSetup'
import TimerView from './TimerView';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      secondsLeft: 25*60,
    }
  }

  setBreakTime = time => this.setState({ breakTime: time })
  setSessionTime = time => this.setState({ sessionTime: time })

  componentDidMount() {
    const timerId = window.setInterval(() => {
      this.setState({ secondsLeft: this.state.secondsLeft-1 })
    }, 1000)
  }

  render() {

    const {sessionTime, breakTime, secondsLeft} = this.state

    return (
      <div className="App">
        <TimerSetup timerType="Session time" time={ sessionTime } setTime={ this.setSessionTime } />
        <TimerSetup timerType="Break time" time={ breakTime }  setTime={ this.setBreakTime } />
        <TimerView timerLabel='Session' secondsLeft={ secondsLeft }/>
      </div>
    );
  }
}

export default App;
