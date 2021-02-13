<template>
  <div class="media-badge d-inline-block pos-absolute-b m-2 p-y-1 br-1 f-6 pointer-events-none">
    {{ text }}
  </div>
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
    color: #fff;
    text-align: center;
  }
</style>
