<template>
  <button
    class="button h-6 d-flex align-items-center justify-content-center f-5 fw-700 cursor-pointer"
    :class="{'is-clear': clear, 'is-icon': icon, 'is-compact': compact}"
    v-bind="$attrs"
    v-on="$listeners">
    {{ text }}
    <slot/>
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
    },
    compact: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .button {
    --height: 40px;
    --width: auto;
    --padding: 0 16px;
    --bg-color: var(--primary-color);
    --color: #fff;
    --border-radius: 4px;
    --opacity: 1;
    height: var(--height);
    width: var(--width);
    background-color: var(--bg-color);
    color: var(--color);
    opacity: var(--opacity);
    border-radius: var(--border-radius);
    &.is-compact {
      --height: 24px;
      --padding: 0 8px;
    }
    &.is-clear {
      --bg-color: transparent;
      --color: var(--secondary-color);
    }
    &.is-icon {
      --width: var(--height);
      --padding: 0;
      border-radius: 50%;
    }
    &:hover {
      --opacity: 0.8;
    }
    &:disabled {
      --opacity: 0.6;
    }
  }
</style>
