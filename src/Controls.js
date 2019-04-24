import React from 'react'
import PropTypes from "prop-types"

function Controls(props) {

  const {resetTimer, stopStartTimer} = props

  return (
    <div>
      <button onClick={ stopStartTimer }>Start / Pause</button>
      <button onClick={ resetTimer }>Reset</button>
    </div>
  )
}

Controls.propTypes = {
  resetTimer: PropTypes.func.isRequired,
  stopStartTimer: PropTypes.func.isRequired,
}

export default Controls;