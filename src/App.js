import React, { Component } from 'react';
import './App.css';
import TimerSetup from './TimerSetup'
import TimerView from './TimerView';
import Controls from './Controls';

class App extends Component {

  constructor(props) {
    super(props)
    this.timeScale = 1

    const sessionLength = 5
    this.state = {
      breakLength: 2,
      sessionLength,
      timeLeft: sessionLength*60,
      isBreak: false,
      isPaused: true,
    }
  }

  setTime(sessionType) {
    return function(time) {
      this.setState(state => ({ [`${sessionType}Length`] : time }))
      this.resetTimer()
    }
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
      this.setState({ timeLeft: this.state.timeLeft-1 })
    }, 1000 * this.timeScale)
  }
  
  startTimeout() {
    window.clearTimeout(this.timeoutId)

    const {timeLeft} = this.state

    this.timeoutId = setTimeout(() => {
      window.clearInterval(this.intervalId)
      
      function getSessionTime(isBreak, state) {
        return isBreak ? state.breakLength*60 : state.sessionLength*60
      }

      this.setState(state => {
        const isBreak = state.isBreak
        const newSessionType = !isBreak
        return {
          isBreak: !isBreak,
          timeLeft: getSessionTime(newSessionType, state),
        }
      })

      this.startCountdown()
      this.startTimeout()

    }, timeLeft * 1000 * this.timeScale)
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

    this.setState(state => {
      return {
          // current session becomes SESSION
        isBreak: false,
        // current time becomes equal to SESSION TIME
        timeLeft: state.sessionLength * 60,
        isPaused: true,
      }
    })
    // sound stops
    // ? reset session length
    // ? reset break length
  }

  render() {

    const {sessionLength, breakLength, timeLeft, isBreak, isPaused} = this.state
    const timerLabel = isBreak ? SessionType.BREAK : SessionType.SESSION
    const stopStartTimer = isPaused ? this.runTimer : this.pauseTimer

    return (
      <div className="App">
        <TimerSetup timerType="Session time" time={ sessionLength } 
          setTime={ this.setTime('session').bind(this) }
        />
        <TimerSetup timerType="Break time" time={ breakLength } 
          setTime={ this.setTime('break').bind(this) }
        />
        <TimerView timerLabel={ timerLabel } secondsLeft={ timeLeft }/>
        <Controls 
          stopStartTimer={ stopStartTimer } resetTimer={ this.resetTimer }
          isPaused={ isPaused }
        />
      </div>
    );

  }
}

class SessionType {}
SessionType.SESSION = 'session'
SessionType.BREAK = 'break'

export default App;
