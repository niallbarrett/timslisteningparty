<template>
  <div :class="`h-14 d-grid grid-${items.length}`">
    <div
      v-for="item in items"
      :key="item.id_str"
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
  .media-item {
    background-size: cover;
    background-position: center;
  }
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
</style>
