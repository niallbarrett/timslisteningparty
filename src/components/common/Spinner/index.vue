<template>
  <transition name="fade">
    <div class="container d-flex justify-content-center align-items-center pos-absolute top-0 right-0 bottom-0 left-0">
      <div class="spinner h-4 d-flex">
        <div v-for="n in 5" :key="n" class="h-full"/>
      </div>
    </div>
  </transition>
</template>

<style lang='scss' scoped>
  .container {
    --bg: var(--bg-color);
    --primary: var(--primary-color);
    --secondary: #{'rgb(var(--border-color))'};
    background-color: var(--bg);
    z-index: 1;
    .spinner div {
      width: 2px;
      margin: 0 1px;
      background-color: var(--primary);
      animation: stretch 2s infinite cubic-bezier(.62, .28, .23, .99);
      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          animation-delay: -1s + (($i - 1) * 0.1s);
        }
      }
    }
  }
  @keyframes stretch {
    0%, 20%, 49% {
      background-color: var(--primary);
      transform: scaleY(0.4);
    }
    10% {
      transform: scaleY(1.0);
    }
    50%, 70%, 100% {
      background-color: var(--secondary);
      transform: scaleY(0.4);
    }
    60% {
      background-color: var(--secondary);
      transform: scaleY(1.0);
    }
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
</style>
