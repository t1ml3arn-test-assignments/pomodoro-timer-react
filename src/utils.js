export function secondsToString(value) {
  const minutes = Math.trunc(value/60)
  const seconds = value % 60
  
  let str = ''
  str += prependZero(minutes) + ':'
  str += prependZero(seconds)

  return str
}

function prependZero(value) {
  return value < 10 ? `0${value}` : `${value}`
}