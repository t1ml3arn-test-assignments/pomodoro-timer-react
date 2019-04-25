import React, { Component } from "react"
import PropTypes from "prop-types"

function TimerSetup(props) {

  const {minTime, maxTime, time, incrementTime, setTime, timerLabel} = props

  const onChange = e => {
    setTime(e.target.value)
  }

  return (
    <div className='timer-setup'>
      <h2>{ timerLabel }</h2>
      <span className='sub-text'>in minutes</span>
      <input type='range' 
        min={minTime} max={maxTime} step="1" value={time} 
        onChange={ onChange }
      />
      <div className='timer-setup__controls'>
        <button
          onClick={ e => incrementTime(-1) }
          >-</button>
        <input type='number' 
          min={minTime} max={maxTime} step="1" value={time} 
          onChange={ onChange }
          />
        <button
          onClick={ e => incrementTime(+1) }
        >+</button>
      </div>
    </div>
  )
}

TimerSetup.propTypes = {
  timerLabel: PropTypes.string,
  minTime: PropTypes.number,
  maxTime:  PropTypes.number,
  time: PropTypes.number,
  incrementTime: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
}

TimerSetup.defaultProps = {
  timerLabel: "Timer setup",
  minTime: 1,
  maxTime: 60,
  time: 5,
}

export default TimerSetup;