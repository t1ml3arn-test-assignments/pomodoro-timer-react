import React, { Component } from 'react';
import './App.css';
import TimerSetup from './TimerSetup'
import TimerView from './TimerView';
import Controls from './Controls';

class App extends Component {

  constructor(props) {
    super(props)
    this.timeScale = 0.025

    this.state = {
      breakLength: 2,
      sessionLength: 5,
      secondsLeft: 0,
      isBreak: false,
      isPaused: true,
    }
  }

  setBreakTime = time => this.setState({ breakLength: time })
  setSessionTime = time => this.setState({ sessionLength: time })

  componentDidMount() {
    this.setState({ secondsLeft: this.getSessionTime(this.state.isBreak) })
  }

  runTimer = () => {
    this.setState(
      { isPaused: false, }
      , 
      // since state updates not immideatly
      // we provide a callback to start timers
      // AFTER state is updated
      () => {
        this.startCountdown()
        this.startTimeout()
      }
    )
  }

  startCountdown() {
    window.clearInterval(this.intervalId)
    
    this.intervalId = setInterval(() => {
      this.setState({ secondsLeft: this.state.secondsLeft-1 })
    }, 1000 * this.timeScale)
  }
  
  startTimeout() {
    window.clearTimeout(this.timeoutId)

    const {secondsLeft} = this.state

    this.timeoutId = setTimeout(() => {
      window.clearInterval(this.intervalId)

      const isBreak = this.state.isBreak
      const newSessionType = !isBreak

      this.setState({
        isBreak: newSessionType,
        secondsLeft: this.getSessionTime(newSessionType),
      })

      this.startCountdown()
      this.startTimeout()

    }, secondsLeft * 1000 * this.timeScale)
  }

  getSessionTime(isBreak) {
    return isBreak ? this.state.breakLength*60 : this.state.sessionLength*60
  }

  pauseTimer = () => {
    window.clearInterval(this.intervalId)
    window.clearInterval(this.timeoutId)
    this.setState({ isPaused: true })
  }

  resetTimer = () => {
    // timer becomes deactivated
    window.clearInterval(this.intervalId)
    window.clearInterval(this.timeoutId)

    this.setState({
      // current session becomes SESSION
      isBreak: false,
      // current time becomes equal to SESSION TIME
      secondsLeft: this.getSessionTime(false),
    })
    // sound stops
    // ? reset session length
    // ? reset break length
  }

  render() {

    const {sessionLength, breakLength, secondsLeft, isBreak, isPaused} = this.state
    const sessionType = isBreak ? SessionType.BREAK : SessionType.SESSION
    const stopStartTimer = isPaused ? this.runTimer : this.pauseTimer

    return (
      <div className="App">
        <TimerSetup timerType="Session time" time={ sessionLength } setTime={ this.setSessionTime } />
        <TimerSetup timerType="Break time" time={ breakLength }  setTime={ this.setBreakTime } />
        <TimerView timerLabel={ sessionType } secondsLeft={ secondsLeft }/>
        <Controls 
          stopStartTimer={ stopStartTimer } resetTimer={ this.resetTimer }
          isPaused={ isPaused }/>
      </div>
    );

  }
}

class SessionType {}
SessionType.SESSION = 'session'
SessionType.BREAK = 'break'

export default App;
