<template>
  <div class="result d-flex p-t-2xs p-b-2xs p-l-xs p-r-xs b-t cursor-pointer hover" @click="$emit('click')">
    <img :src="item.images[0].url" class="h-md w-md m-r-xs">
    <div class="d-flex direction-column">
      <div class="m-b-3xs">
        {{ item.name }}
      </div>
      <div class="fs-xs c-secondary">
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
    }
  }
}
</script>

<style lang='scss' scoped>
  .result:first-of-type {
    border-top-width: 0;
  }
</style>
