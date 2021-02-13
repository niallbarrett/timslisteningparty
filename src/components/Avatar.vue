<template>
  <img :src="image" :class="`avatar h-${size} w-${size} flex-shrink-0`"/>
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
  computed: {
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
