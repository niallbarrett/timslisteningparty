<template>
  <div class="media-item pos-relative cursor-pointer" @click="toggle">
    <video ref="video" class="vid max-h-100 max-w-100 d-block object-fit-contain pointer-events-none" controls @timeupdate="onTimeUpdate">
      <source :src="item.video_info.variants[1].url" :type="item.video_info.variants[1].content_type"/>
    </video>
    <MediaBadge :text="time" class="p-l-2xs p-r-2xs"/>
  </div>
</template>

<script>
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
  methods: {
    onTimeUpdate() {
      this.currentTime = this.$refs.video.currentTime * 1000
    },
    toggle() {
      if (this.$refs.video.paused)
        return this.$refs.video.play()

      return this.$refs.video.pause()
    },
    formatDisplay(time) {
      return time > 9 ? time : '0' + time
    }
  },
  computed: {
    time() {
      const left = this.item.video_info.duration_millis - this.currentTime

      if (left < 0)
        return '0:00'

      const seconds = Math.floor((left / 1000) % 60)
      const minutes = Math.floor((left / 1000 / 60) % 60)

      return minutes + ':' + this.formatDisplay(seconds)
    }
  }
}
</script>

<style lang='scss' scoped>
  .media-item {
    background-color: var(--video-bg-color);
  }
  .vid {
    margin: 0 auto;
  }
</style>
