<template>
  <div class="d-flex direction-column justify-content-center br-xs">
    <div v-if="title.length > 0" class="title b-b p-xs fs-sm fw-800">
      {{ title }}
    </div>
    <div class="d-flex direction-column">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
