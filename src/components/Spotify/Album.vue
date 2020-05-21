<template>
  <div class="album br-2xs overflow-hidden">
    <div class="p-xs">
      <img :src="art" class="w-100" @click="play(item.uri)"/>
    </div>
    <div>
      <Track v-for="track in tracks" :key="track.id" :item="track"/>
    </div>
  </div>
</template>

<script>
import Track from './Track'

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
    play(uri) {
      console.log(uri)
    }
  }
}
</script>

<style lang='scss' scoped>
  .album {
    background: rgb(245, 248, 250);
  }
</style>
