<template>
  <div class="bg-accent br-2xs overflow-hidden">
    <div class="p-xs">
      <img :src="art" class="w-100 cursor-pointer" @click="playAlbum(item.uri)"/>
    </div>
    <div>
      <Track v-for="track in tracks" :key="track.id" :item="track" @play="playTrack"/>
    </div>
  </div>
</template>

<script>
import Track from './Track'

import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()

export default {
  components: {
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
