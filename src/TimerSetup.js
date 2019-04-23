import React, { Component } from "react"
import PropTypes from "prop-types"

class TimerSetup extends Component {

  constructor(props) {
    super(props)

    this.state = { ...props }
  }

  onChange = e => {
    let {type, value} = e.target
    const {minTime, maxTime, time} = this.state
    console.log(`${type} change`, value)

    value = !value ? time : parseInt(value)
    value = bound(value, minTime, maxTime)
    
    this.setState({
      time: parseInt(value)
    })
  }

  render() {
    const {minTime, maxTime, time} = this.state

    return (
      <div>
        <h2>{ this.props.timerType }</h2>
        <input type='range' 
          min={minTime} max={maxTime} step="1" value={time} 
          onChange={this.onChange}
        />
        <div>
          <button>-</button>
          <input type='number' 
            min={minTime} max={maxTime} step="1" value={time} 
            onChange={this.onChange}
          />
          <button>+</button>
        </div>
      </div>
    )
  }
}

TimerSetup.propTypes = {
  timerLabel: PropTypes.string,
  minTime: PropTypes.number,
  maxTime:  PropTypes.number,
  time: PropTypes.number,
  step: PropTypes.number
}

TimerSetup.defaultProps = {
  timerLabel: "Timer setup",
  minTime: 1,
  maxTime: 60,
  time: 5,
  step: 5,
}

function bound(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default TimerSetup;