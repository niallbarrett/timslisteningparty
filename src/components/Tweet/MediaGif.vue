<template>
  <div class="pos-relative">
    <video class="w-100 d-block pointer-events-none" autoplay mute loop>
      <source :src="item.video_info.variants[0].url"/>
    </video>
    <MediaBadge text="GIF" class="w-md extra-bold"/>
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
  }
}
</script>
