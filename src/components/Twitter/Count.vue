<template>
  <div class="d-flex align-items-center c-secondary">
    <span class="p-r-1 c-text fw-700">
      {{ count }}
    </span>
    {{ label }}
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
