<template>
  <div class="media-item pos-relative cursor-pointer">
    <video ref="video" class="max-h-100 max-w-100 m-0-auto d-block object-fit-contain" controls @timeupdate="onTimeUpdate">
      <source :src="item.video_info.variants[1].url" :type="item.video_info.variants[1].content_type">
    </video>
    <MediaBadge :text="time" class="p-x-2"/>
  </div>
</template>

<script>
// Utils
import { formatDuration } from '@/utils/Format'
// Components
import MediaBadge from './MediaBadge'

export default {
  components: {
    MediaBadge
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentTime: 0
    }
  },
  computed: {
    time() {
      return formatDuration(this.item.video_info.duration_millis - this.currentTime)
    }
  },
  methods: {
    onTimeUpdate() {
      this.currentTime = this.$refs.video.currentTime * 1000
    }
  }
}
</script>

<style lang='scss' scoped>
  .media-item {
    background-color: #000;
  }
</style>
