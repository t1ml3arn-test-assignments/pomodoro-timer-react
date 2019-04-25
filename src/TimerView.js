import React from 'react'
import { secondsToString } from './utils';
import PropTypes from "prop-types"

function TimerView(props) {

  const { timerLabel, secondsLeft } = props
  let timeLeft = secondsToString(secondsLeft)

  return (
    <div className='timer-view'>
      <h2>{ timerLabel }</h2>
      <p>time left</p>
      <div className='time-left'>{ timeLeft }</div>
    </div>
  )
}

TimerView.propTypes = {
  timerLabel: PropTypes.string.isRequired,
  secondsLeft: PropTypes.number.isRequired
}

export default TimerView;