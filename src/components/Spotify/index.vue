<template>
  <Panel>
    <template #title>
      <Details :item="item" class="p-t-2 p-x-2" @play="play"/>
    </template>
    <div class="p-y-2">
      <Track
        v-for="track in tracks"
        :key="track.id"
        :item="track"
        @play="play"/>
    </div>
  </Panel>
</template>

<script>
// Libraries
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()
// Components
import Panel from '@/components/common/Panel'
import Details from './Details'
import Track from './Track'

export default {
  components: {
    Panel,
    Details,
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
    },
    uri() {
      return this.item.uri
    }
  },
  methods: {
    play(offset = 0) {
      spotify.play({context_uri: this.uri, offset: {position: offset}})
    }
  }
}
</script>
