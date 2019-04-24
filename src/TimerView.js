import React from 'react'
import { secondsToString } from './utils';
import PropTypes from "prop-types"

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

TimerView.propTypes = {
  timerLabel: PropTypes.string.isRequired,
  secondsLeft: PropTypes.number.isRequired
}

export default TimerView;