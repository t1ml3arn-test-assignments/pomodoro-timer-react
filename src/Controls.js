import React from 'react'
import PropTypes from "prop-types"

class Controls extends React.Component {
  render() {
    // start/resume
    // pause

    const {resetTimer, stopStartTimer} = this.props

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