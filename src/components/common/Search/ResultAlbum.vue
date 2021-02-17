<template>
  <div :class="['album p-2 d-flex align-items-center cursor-pointer hover', {'is-active': active}]" v-on="$listeners">
    <img :src="item.images[1].url" class="h-6 w-6 m-r-2 b-a br-0">
    <div class="d-flex direction-column">
      <div class="f-4 fw-700 lh-condensed-ultra wb-break-word">
        {{ item.name }}
      </div>
      <div class="c-secondary f-5">
        {{ item.artists[0].name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .album.is-active {
    background-color: #{'rgb(var(--border-color))'};
  }
</style>
