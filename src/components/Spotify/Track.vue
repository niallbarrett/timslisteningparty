<template>
  <div class="track p-t-2xs p-r-xs p-b-2xs p-l-xs d-flex align-items-center">
    <div>
      {{ item.name }}
    </div>
    <div class="m-l-auto fs-xs c-secondary">
      {{ formatDuration(item.duration_ms) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDuration(duration) {
      const minutes = Math.floor((duration / 1000 / 60) % 60)
      const seconds = this.formatDisplay(Math.floor((duration / 1000) % 60))

      return `${minutes}:${seconds}`
    },
    formatDisplay(time) {
      return time > 9 ? time : '0' + time
    }
  }
}
</script>

<style lang='scss' scoped>
  .track {
    border-top: 1px solid rgb(230, 236, 240);
    counter-increment: tracks;

    &:before {
      content: counter(tracks);
      padding-right: var(--space-3xs);
    }

    &:hover {
      background: red;
    }
  }
</style>
