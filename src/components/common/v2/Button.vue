<template>
  <button
    class="button h-6 p-x-3 d-flex align-items-center justify-content-center f-5 fw-700 cursor-pointer"
    :class="{'is-clear': clear}"
    v-on="$listeners">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    clear: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .button {
    --bg-color: var(--primary-color);
    --color: #fff;
    --border-radius: 4px;
    --opacity: 1;
    background-color: var(--bg-color);
    color: var(--color);
    opacity: var(--opacity);
    border-radius: var(--border-radius);
    &.is-clear {
      --bg-color: transparent;
      --color: var(--secondary-color);
    }
    &:hover {
      --opacity: 0.8;
    }
  }
</style>
