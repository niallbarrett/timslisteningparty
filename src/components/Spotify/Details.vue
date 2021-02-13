<template>
  <div>
    <div
      :class="['cover m-b-2 d-grid pos-relative c-secondary b-a br-1 overflow-hidden', {'cursor-pointer': !empty && !preview}]"
      @click="play">
      <svg :viewBox="aspect"/>
      <img v-if="!empty" :src="cover" class="w-100">
      <div v-else class="d-flex align-items-center justify-content-center">
        <NoteIcon class="h-8"/>
      </div>
      <div v-if="!empty && !preview" class="play p-2 pos-absolute pointer-events-none">
        <Button icon class="primary">
          <PlayIcon class="h-3"/>
        </Button>
      </div>
    </div>
    <div class="f-4 fw-700 lh-condensed">
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
import Button from '@/components/common/Button'
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
    },
    preview: {
      type: Boolean,
      default: false
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
      return this.item.images[0].url
    },
    year() {
      return format(new Date(this.item.release_date), 'yyyy')
    },
    details() {
      if (this.empty)
        return 'Artist'

      return `${this.item.artists[0].name} · ${this.year} ${this.tracks}`
    },
    tracks() {
      return this.preview ? `· ${this.item.total_tracks} tracks` : ''
    },
    aspect() {
      return this.empty ? '0 0 1 1' : '0 0 0 0'
    }
  },
  methods: {
    play() {
      if (!this.preview)
        return this.$emit('play')
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
      right: 0;
      bottom: 0;
      opacity: var(--o);
      transform: translateY(var(--y));
      transition: all 0.2s ease;
      .button {
        box-shadow: var(--elevation-1), var(--elevation-2);
      }
    }
    & > * {
      grid-area: 1/1;
    }
    &:hover .play {
      --o: 1;
      --y: 0px;
    }
  }
</style>
