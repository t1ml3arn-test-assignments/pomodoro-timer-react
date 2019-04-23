export function secondsToString(value) {
  const hours = Math.trunc(value/3600)
  const minutes = Math.trunc((value-hours*3600)/60)
  const seconds = value % 60
  
  let str = hours == 0 ? '' : prependZero(hours) + ':'
  str += prependZero(minutes) + ':'
  str += prependZero(seconds) + ':'

  return str
}

function prependZero(value) {
  return value < 10 ? `0${value}` : `${value}`
}