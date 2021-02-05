<template>
  <div class="container h-100 w-100 d-flex justify-content-center align-items-center pos-absolute bg-color">
    <div class="spinner h-4 w-4 br-50"/>
  </div>
</template>

<style lang='scss' scoped>
  .container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .spinner {
    border: 4px solid;
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
