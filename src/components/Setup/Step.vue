<template>
  <div class="d-flex pos-absolute">
    <div class="step w-16 d-flex bg-color br-2 overflow-hidden">
      <div class="p-y-5 p-x-6 flex-1 d-flex direction-column">
        <div class="m-b-5">
          <div class="f-1 fw-800">
            {{ title }}
          </div>
          <div class="description c-secondary">
            {{ description }}
          </div>
        </div>
        <slot/>
      </div>
      <div v-if="!!$slots.results" class="results w-14 p-4 bg-accent br-2 overflow-y-auto">
        <slot name="results"/>
      </div>
    </div>
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
    height: 500px;
    box-shadow: 10px 9px 21px 0px rgba(128, 152, 213, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
    .results {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
