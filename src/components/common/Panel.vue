<template>
  <div class="p-y-3">
    <div class="panel d-flex direction-column bg-accent br-2 overflow-hidden">
      <slot name="title">
        <div v-if="title" class="b-b p-2 f-4 fw-800">
          {{ title }}
        </div>
      </slot>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang='scss' scoped>
  .panel {
    max-height: calc(100vh - 32px);
  }
</style>
