<template>
  <button
    class="d-flex pos-relative justify-content-center p-t-sm p-r-md p-b-sm p-l-md br-md fw-700 bg-primary cursor-pointer overflow-hidden"
    @click="$emit('click')">
    {{ text }}
  </button>
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
  button {
    color: white;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(white, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--transition-duration) var(--transition-timing-function);
    }

    &:hover:before {
      opacity: 1;
    }
  }
</style>
