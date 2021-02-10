<template>
  <div class="result d-flex p-y-2 p-x-2 b-t cursor-pointer" v-on="$listeners">
    <img :src="item.images[1].url" class="h-6 m-r-2">
    <div class="d-flex direction-column">
      <div class="">
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
