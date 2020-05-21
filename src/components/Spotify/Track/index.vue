<template>
  <div class="track p-t-2xs p-r-xs p-b-2xs p-l-xs d-flex align-items-center fs-xs cursor-pointer hover" @click="$emit('play', item.uri)">
    <div class="bold">
      {{ item.name }}
    </div>
    <Explicit v-if="item.explicit"/>
    <div class="m-l-auto c-secondary">
      {{ formatDuration(item.duration_ms) }}
    </div>
  </div>
</template>

<script>
import Explicit from './Explicit'

export default {
  components: {
    Explicit
  },
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
      font-weight: 700;
    }
  }
</style>
