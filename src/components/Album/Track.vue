<template>
  <div
    class="p-y-1 p-l-2 p-r-3 d-flex align-items-center f-5 cursor-pointer hover"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$emit('play', item.track_number - 1)">
    <div class="w-3 d-flex justify-content-end align-items-center c-secondary ta-r">
      <PlayIcon v-if="hover" class="h-2 c-primary"/>
      <div v-else>{{ item.track_number }}</div>
    </div>
    <div class="p-x-2 flex-1 t-ellipsis" :title="item.name">
      {{ item.name }}
    </div>
    <div class="m-l-auto c-secondary f-6">
      {{ formatDuration(item.duration_ms) }}
    </div>
  </div>
</template>

<script>
// Assets
import PlayIcon from '@/components/icons/Play'

export default {
  components: {
    PlayIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    formatDuration(duration) {
      const minutes = Math.floor((duration / 1000 / 60) % 60)
      const seconds = this.formatDisplay(Math.floor((duration / 1000) % 60))

      return `${minutes}:${seconds}`
    },
    formatDisplay(time) {
      return time > 9 ? time : `0${time}`
    }
  }
}
</script>
