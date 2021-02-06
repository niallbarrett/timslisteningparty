<template>
  <div class="container h-100 w-100 d-flex justify-content-center align-items-center pos-absolute bg-color">
    <div class="spinner h-4 d-flex">
      <div v-for="n in 5" :key="n"/>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    --primary: var(--primary-color);
    --secondary: var(--border-color);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .spinner div {
      height: 100%;
      width: 2px;
      margin: 0 1px;
      background: var(--primary);
      animation: stretch 2s infinite cubic-bezier(.62,.28,.23,.99);
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
</style>
