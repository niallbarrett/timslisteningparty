<template>
  <div class="d-grid h-4xlg" :class="'grid-' + items.length">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="media-item"
      :style="{backgroundImage: `url(${item.media_url})`}"/>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      requred: true
    }
  }
}
</script>

<style lang='scss' scoped>
  .d-grid {
    grid-template-columns: 1fr;
    &:not(.grid-1) {
      grid-template-columns: 1fr 1fr;
      gap: 2px;
    }
    &.grid-3 .media-item:first-child {
      grid-row: 1/3;
    }
  }
  .media-item {
    background-size: cover;
    background-position: center;
  }
</style>
