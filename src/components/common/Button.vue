<template>
  <button
    class="button d-flex align-items-center justify-content-center f-5 fw-700 br-1 cursor-pointer"
    :class="{'is-clear': clear, 'is-icon round': icon, 'is-compact': compact}"
    v-bind="$attrs"
    v-on="$listeners">
    <slot>
      {{ text }}
    </slot>
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
    --bg-color: #{'rgb(var(--border-color))'};
    --color: #fff;
    --opacity: 1;
    height: var(--height);
    width: var(--width);
    padding: var(--padding);
    background-color: var(--bg-color);
    color: var(--color);
    opacity: var(--opacity);
    &.primary {
      --bg-color: var(--primary-color);
    }
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
    }
    &:hover {
      --opacity: 0.9;
    }
    &:disabled {
      --opacity: 0.6;
    }
  }
</style>
