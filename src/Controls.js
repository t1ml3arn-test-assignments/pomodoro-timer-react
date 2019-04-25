import React from 'react'
import PropTypes from "prop-types"

function Controls(props) {

  const {resetTimer, stopStartTimer, isPaused} = props

  const startLabel = isPaused ? 'Run' : 'Pause'

  return (
    <div className='timer-controls'>
      <button onClick={ stopStartTimer }>{ startLabel }</button>
      <button onClick={ resetTimer }>Reset</button>
    </div>
  )
}

Controls.propTypes = {
  resetTimer: PropTypes.func.isRequired,
  stopStartTimer: PropTypes.func.isRequired,
  isPaused: PropTypes.bool
}

export default Controls;