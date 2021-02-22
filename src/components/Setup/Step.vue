<template>
  <div :class="['step max-h-viewport w-16 d-flex direction-column bg-color br-2 pos-absolute overflow-hidden', {'h-16 w-17': wide}]">
    <div class="min-h-0 d-flex flex-1 pos-relative">
      <div class="p-y-5 p-x-6 flex-1 d-flex direction-column">
        <div :class="{'m-b-5': wide}">
          <div class="m-b-1 f-1 fw-800">
            {{ title }}
          </div>
          <div class="description c-secondary">
            {{ description }}
          </div>
        </div>
        <slot/>
      </div>
      <div v-if="wide" class="step-results p-y-4 bg-accent br-2 pos-relative overflow-y-auto">
        <slot name="results"/>
      </div>
    </div>
    <div class="p-y-3 p-x-5 d-flex justify-content-end flex-shrink-0 b-t">
      <slot name="footer"/>
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
    },
    wide: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .step {
    box-shadow: var(--elevation-1), var(--elevation-2);
    &-results {
      width: 40%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
