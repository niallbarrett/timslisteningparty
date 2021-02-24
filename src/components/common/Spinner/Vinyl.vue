<template>
  <transition name="fade">
    <div :class="['container d-flex justify-content-center align-items-center pos-absolute top-0 right-0 bottom-0 left-0', {'is-transparent': transparent}]">
      <div class="d-flex direction-column align-items-center">
        <div class="vinyl h-7 w-7 d-flex justify-content-center align-items-center br-circle">
          <div class="vinyl-center h-3 w-3 br-circle"/>
        </div>
        <div v-if="message" class="max-w-13 m-t-2 c-secondary f-6 fw-800 text-center">
          {{ message }}...
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: undefined
    },
    transparent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  $bg: #2a2928;

  .container {
    --bg: var(--bg-color);
    --primary: var(--primary-color);
    --secondary: #{'rgb(var(--border-color))'};
    background-color: var(--bg);
    z-index: 1;
    .vinyl {
      background:
      linear-gradient(30deg, transparent 40%, rgba($bg, .85) 40%) no-repeat 100% 0,
      linear-gradient(60deg, rgba($bg, .85) 60%, transparent 60%) no-repeat 0 100%,
      repeating-radial-gradient($bg, $bg 2px, #434039 3px, $bg 4px);
      background-size: 50% 100%, 100% 50%, 100% 100%;
      animation: rotate 1.5s linear infinite;
      &-center {
        background-color: #000;
        border: 6px solid var(--primary-color);
        border-radius: 50%;
      }
    }
    &.is-transparent {
      --bg: transparent;
    }
  }
  @keyframes rotate {
    to {
      transform: rotate(359deg);
    }
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
</style>
