<template>
  <Panel>
    <template #title>
      <Album :item="item" class="p-t-2 p-x-2"/>
    </template>
    <div class="p-y-1">
      <Track v-for="track in tracks" :key="track.id" :item="track"/>
    </div>
  </Panel>
</template>

<script>
import Panel from '@/components/common/Panel'
import Album from '@/components/Setup/Album'
import Track from './Track'

export default {
  components: {
    Panel,
    Album,
    Track
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    tracks() {
      return this.item.tracks.items
    }
  }
}
</script>
