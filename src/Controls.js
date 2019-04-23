import React from 'react'

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
}

export default Controls;