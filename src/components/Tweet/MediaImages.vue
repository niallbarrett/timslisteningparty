<template>
  <div class="d-grid h-4xlg" :class="'grid-' + items.length">
    <div v-for="(item, index) in items" :key="index" class="media-item d-flex flex-1">
      <img :src="item.media_url" class="max-h-100 w-100 d-block object-fit-cover vertical-align-middle"/>
    </div>
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
</style>
