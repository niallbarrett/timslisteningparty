import twttr from 'twitter-text'

const ranges = [{ divider: 1e6, suffix: 'M' }, { divider: 1e3, suffix: 'k' }]

export function autoLink(text) {
  return twttr.autoLink(text, { usernameIncludeSymbol: true, targetBlank: true })
}

export function formatCount(number) {
  for(const range of ranges) {
    if (number >= range.divider)
      return `${(number / range.divider).toFixed(1)}${range.suffix}`;
  }

  return number.toString()
}
