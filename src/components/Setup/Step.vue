<template>
  <div class="d-flex">
    <div class="step p-y-5 p-x-6 d-flex direction-column bg-color">
      <div class="m-b-3">
        <div class="f-2 fw-800">
          {{ title }}
        </div>
        <div class="description m-t-1 c-secondary">
          {{ description }}
        </div>
      </div>
      <slot/>
    </div>
    <slot name="result"/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang='scss' scoped>
  .step {
    border-radius: 4px;
  }
</style>
