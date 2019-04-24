import React, { Component } from 'react';
import './App.css';
import TimerSetup from './TimerSetup'
import TimerView from './TimerView';
import Controls from './Controls';
import alarm1 from './alarm1.mp3';

class App extends Component {

  constructor(props) {
    super(props)
    this.timeScale = 1
    this.audioRef = React.createRef()

    const sessionLength = 5
    this.state = {
      breakLength: 2,
      sessionLength,
      timeLeft: sessionLength*60,
      isBreak: false,
      isPaused: true,
      maxTime: 60,
      minTime: 1
    }
  }

  setTime(sessionType, time) {
    this.setSessionTime(`${sessionType}Length`, time)
    this.resetTimer()
  }

  incrementTime(sessionType, inc) {
    
    const propName = `${sessionType}Length`
  
    this.setSessionTime(propName, this.state[propName] + inc)
    this.resetTimer()
  }

  setSessionTime(propName, time) {
    const {maxTime, minTime} = this.state
    const currentTime = this.state[propName]

    time = !time ? currentTime : ( typeof(time) === 'string' ? parseInt(time) : time)
    time = Math.min(maxTime, Math.max(minTime, time))
  
    this.setState({ [propName] : time })
  }

  runTimer = () => {
    this.audioRef.current.pause()

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

      const audio = this.audioRef.current
      
      audio.pause()
      audio.currentTime = 0.0
      audio.playbackRate = 1.1
      audio.play()

      this.startCountdown()
      this.startTimeout()

    }, timeLeft * 1000 * this.timeScale)
  }

  pauseTimer = () => {
    window.clearInterval(this.intervalId)
    window.clearInterval(this.timeoutId)

    this.audioRef.current.pause()
    this.setState({ isPaused: true })
  }

  resetTimer = () => {
    // timer becomes deactivated
    window.clearInterval(this.intervalId)
    window.clearInterval(this.timeoutId)

    // sound stops
    this.audioRef.current.pause()

    this.setState(state => ({
        // current session becomes SESSION
        isBreak: false,
        // current time becomes equal to SESSION TIME
        timeLeft: state.sessionLength * 60,
        isPaused: true,
    }))
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
          setTime={ this.setTime.bind(this, 'session') }
          incrementTime={ this.incrementTime.bind(this, 'session') }
        />
        <TimerSetup timerType="Break time" time={ breakLength } 
          setTime={ this.setTime.bind(this, 'break') }
          incrementTime={ this.incrementTime.bind(this, 'break') }
        />
        <TimerView timerLabel={ timerLabel } secondsLeft={ timeLeft }/>
        <Controls 
          stopStartTimer={ stopStartTimer } resetTimer={ this.resetTimer }
          isPaused={ isPaused }
        />
        <audio ref={this.audioRef} preload='auto' src={alarm1}></audio>
      </div>
    );

  }
}

class SessionType {}
SessionType.SESSION = 'session'
SessionType.BREAK = 'break'

export default App;
