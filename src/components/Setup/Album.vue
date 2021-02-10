<template>
  <div>
    <div
      :class="['cover h-13 w-13 p-3 m-b-2 d-flex align-items-center justify-content-center c-secondary b-a br-1', {'cursor-pointer justify-content-end align-items-end': !empty}]"
      :style="{backgroundImage: cover}">
      <NoteIcon v-if="empty" class="h-8"/>
      <Button v-if="!empty" icon class="play primary">
        <PlayIcon class="h-3"/>
      </Button>
    </div>
    <div class="f-4 fw-700 lh-condensed-ultra">
      {{ title }}
    </div>
    <div class="f-5 c-secondary">
      {{ details }}
    </div>
  </div>
</template>

<script>
// Libraries
import { format } from 'date-fns'
// Components
import Button from '@/components/common/v2/Button'
// Assets
import NoteIcon from '@/components/icons/Note'
import PlayIcon from '@/components/icons/Play'

export default {
  components: {
    Button,
    NoteIcon,
    PlayIcon
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
    year() {
      return format(new Date(this.item.release_date), 'yyyy')
    },
    details() {
      if (this.empty)
        return 'Artist'

      return `${this.item.artists[0].name} · ${this.year} · ${this.item.total_tracks} tracks`
    }
  }
}
</script>

<style lang='scss' scoped>
  .cover {
    --o: 0;
    --y: 10px;
    background-size: cover;
    background-position: center;
    .play {
      opacity: var(--o);
      transform: translateY(var(--y));
      transition: all 0.2s ease;
      box-shadow: var(--elevation-1), var(--elevation-2);
    }
    &:hover .play {
      --o: 1;
      --y: 0px;
    }
  }
</style>
