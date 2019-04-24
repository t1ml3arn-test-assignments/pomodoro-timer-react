import React from 'react'
import { secondsToString } from './utils';

function TimerView(props) {

  const { timerLabel, secondsLeft } = props
  let timeLeft = secondsToString(secondsLeft)

  return (
    <div>
      <h2>{ timerLabel }</h2>
      <p>time left</p>
      <div>{ timeLeft }</div>
    </div>
  )
}

export default TimerView;