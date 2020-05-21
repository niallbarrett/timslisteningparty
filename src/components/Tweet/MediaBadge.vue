<template>
  <div class="media-badge d-inline-block pos-absolute-b m-2xs p-t-3xs p-b-3xs br-2xs fs-xs pointer-events-none">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
  .media-badge {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
  }
</style>
