export function formatDuration(duration) {
  const minutes = Math.floor((duration / 1000 / 60) % 60)
  const seconds = leadingZero(Math.floor((duration / 1000) % 60))

  return `${minutes}:${seconds}`
}

export function leadingZero(number) {
  return number > 9 ? number : `0${number}`
}
