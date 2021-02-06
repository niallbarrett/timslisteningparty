<template>
  <div :class="`timeline min-h-100vh w-100 d-flex direction-column-reverse justify-content-${count > 0 ? 'start':'center align-items-center'} b-l b-r`">
    <slot v-if="count > 0"/>
    <div v-else class="p-5 d-flex direction-column f-3 c-secondary">
      <Beer class="h-7"/>
      <div>No tweets yet. Go and grab a beer in the meantime!</div>
    </div>
  </div>
</template>

<script>
import Beer from '@/components/icons/Beer'

export default {
  components: {
    Beer
  },
  props: {
    count: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
  .timeline {
    max-width: 600px;
  }
</style>
