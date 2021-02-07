<template>
  <div class="step max-h-100vh w-15 d-flex direction-column bg-color br-2 pos-absolute" :class="{'is-wide w-16': wide}">
    <div class="min-h-0 d-flex flex-1">
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
      <div v-if="!!$slots.results" class="results p-y-4 bg-accent br-2 overflow-y-auto">
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
    --height: auto;
    height: var(--height);
    box-shadow: 10px 9px 21px 0px rgba(128, 152, 213, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
    .results {
      width: 40%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &.is-wide {
      --height: 500px;
    }
  }
</style>
