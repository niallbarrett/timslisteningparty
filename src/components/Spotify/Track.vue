<template>
  <div
    class="p-y-1 p-l-2 p-r-3 d-flex align-items-center f-5 cursor-pointer hover"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$emit('play', item.track_number - 1)">
    <div class="w-3 d-flex justify-content-end align-items-center c-secondary text-right">
      <PlayIcon v-if="hover" class="h-2 c-primary"/>
      <span v-else>{{ item.track_number }}</span>
    </div>
    <div class="p-x-2 flex-1 t-ellipsis" :title="item.name">
      {{ item.name }}
    </div>
    <div class="m-l-auto c-secondary f-6">
      {{ duration }}
    </div>
  </div>
</template>

<script>
// Utils
import { formatDuration } from '@/utils/Format'
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
  computed: {
    duration() {
      return formatDuration(this.item.duration_ms)
    }
  }
}
</script>
