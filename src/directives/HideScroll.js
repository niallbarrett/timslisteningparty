const hideScroll = {
  bind: function() {
    document.documentElement.style.overflow = 'hidden'
  },
  unbind: function() {
    document.documentElement.style.overflow = 'auto'
  }
}

export default hideScroll
