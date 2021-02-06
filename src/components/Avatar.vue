<template>
  <img :src="image" :class="`avatar h-${compact ? '4 w-4':'7 w-7'} flex-shrink-0`"/>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .avatar {
    border-radius: 50%;
  }
</style>
