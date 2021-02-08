<template>
  <div class="p-x-4">
    <div :class="['cover h-13 w-13 m-b-2 d-flex align-items-center justify-content-center c-secondary b-a br-1', {'cursor-pointer': !empty}]" :style="{backgroundImage: cover}">
      <NoteIcon v-if="empty" class="h-9"/>
    </div>
    <div class="f-3 fw-800 lh-condensed-ultra">
      {{ title }}
    </div>
    <div class="f-5 c-secondary">
      {{ details }}
    </div>
  </div>
</template>

<script>
import NoteIcon from '@/components/icons/Note'

export default {
  components: {
    NoteIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    empty() {
      return !this.item.id
    },
    title() {
      return this.empty ? 'Album' : this.item.name
    },
    cover() {
      return this.empty ? null : `url(${this.item.images[0].url})`
    },
    details() {
      if (this.empty)
        return 'Artist'

      return `${this.item.artists[0].name} · ${this.item.total_tracks} tracks`
    }
  }
}
</script>

<style lang='scss' scoped>
  .cover {
    background-size: cover;
    background-position: center;
  }
</style>
