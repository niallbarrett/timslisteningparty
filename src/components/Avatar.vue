<template>
  <img :src="image" class="avatar flex-shrink-0"/>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
  .avatar {
    border-radius: 50%;
  }
</style>
