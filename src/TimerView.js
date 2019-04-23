import React, { Component } from 'react'
import { secondsToString } from './utils';

class TimerView extends Component {
  render() {
    const { timerLabel, secondsLeft } = this.props
    let timeLeft = secondsToString(secondsLeft)

    return (
        <div>
          <h2>{ timerLabel }</h2>
          <p>time left</p>
          <div>{ timeLeft }</div>
        </div>
    )
  }
}

export default TimerView;