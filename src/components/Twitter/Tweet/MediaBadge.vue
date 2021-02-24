<template>
  <div class="media-badge m-2 p-y-1 d-inline-block pos-absolute bottom-0 br-1 f-6 text-center pointer-events-none">
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
  }
</style>
