<template>
  <Panel class="bg-accent overflow-hidden">
    <div class="d-flex p-xs">
      <img :src="art" class="h-xlg w-xlg m-r-2xs cursor-pointer" @click="playAlbum(item.uri)"/>
      <div class="m-t-2xs d-flex direction-column">
        <div class="m-b-3xs fs-sm fw-800">{{ name }}</div>
        <div class="c-secondary">{{ artist }}</div>
      </div>
    </div>
    <div>
      <Track v-for="track in tracks" :key="track.id" :item="track" @play="playTrack"/>
    </div>
  </Panel>
</template>

<script>
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

import Panel from '@/components/common/Panel'
import Track from './Track'

export default {
  components: {
    Panel,
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
    art() {
      return this.item.images[0].url
    },
    name() {
      return this.item.name
    },
    artist() {
      return this.item.artists[0].name
    }
  },
  methods: {
    playAlbum(uri) {
      spotify.play({context_uri: uri}).then(function (data) {
        console.log(data)
      }, function (err) {
        console.log(err)
      })
    },
    playTrack(uri) {
      spotify.play({uris: [uri]}).then(function (data) {
        console.log(data)
      }, function (err) {
        console.log(err)
      })
    }
  }
}
</script>
