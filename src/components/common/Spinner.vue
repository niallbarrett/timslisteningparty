<template>
  <div class="container h-100 w-100 d-flex justify-content-center align-items-center pos-absolute bg-color">
    <div class="spinner h-md w-md br-50"/>
  </div>
</template>

<style lang='scss' scoped>
  .spinner {
    border: var(--space-3xs) solid;
    border-top-color: var(--primary-color);
    border-left-color: var(--primary-color);
    border-bottom-color: var(--accent-color);
    border-right-color: var(--accent-color);
    animation: spinner 0.8s ease-in-out infinite;
  }
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
