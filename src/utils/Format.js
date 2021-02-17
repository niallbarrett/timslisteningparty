export function formatDuration(duration) {
  if (duration < 0)
    return '0:00'

  const minutes = Math.floor((duration / 1000 / 60) % 60)
  const seconds = leadingZero(Math.floor((duration / 1000) % 60))

  return `${minutes}:${seconds}`
}

export function leadingZero(number) {
  return number > 9 ? number : `0${number}`
}
