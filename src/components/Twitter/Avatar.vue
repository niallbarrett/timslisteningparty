<template>
  <img :src="src" :class="`avatar h-${size} w-${size} flex-shrink-0`" @error="error = true"/>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: false,
      default: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
    }
  },
  computed: {
    src() {
      if (this.error)
        return this.default

      if (this.compact)
        return this.image

      return this.image.replace('_normal', '_bigger')
    },
    size() {
      if (this.large)
        return '8'

      return this.compact ? '4' : '7'
    }
  }
}
</script>

<style lang='scss' scoped>
  .avatar {
    border-radius: 50%;
  }
</style>
