<template>
  <Step
    title="Choose the album"
    description="Choose an album or skip, everybody knows the pain."
    wide>
    <Search v-model="query" placeholder="Search albums" empty="Search by artist or album name" :count="results.length" :loading="loading">
      <ResultAlbum
        v-for="result in results"
        :key="result.id"
        v-close-popover
        :item="result"
        :active="album.id === result.id"
        @click="select(result.id)"/>
    </Search>
    <template #results>
      <Album :item="album" class="p-x-4"/>
    </template>
    <template #footer>
      <Button text="Skip" clear @click="$emit('next')"/>
      <Button text="Next" :disabled="disabled" class="primary m-l-2" @click="$emit('next')"/>
    </template>
  </Step>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
import SpotifyWebApi from 'spotify-web-api-js'
let spotify = new SpotifyWebApi()
// Components
import Step from './Step'
import Album from './Album'
import Button from '@/components/common/Button'
import Search from '@/components/common/Search'
import ResultAlbum from '@/components/common/Search/ResultAlbum'

export default {
  components: {
    Step,
    Album,
    Button,
    Search,
    ResultAlbum
  },
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      prev: null,
      disabled: true
    }
  },
  computed: {
    ...mapGetters([
      'album'
    ])
  },
  watch: {
    query(val) {
      if (!val.length)
        return this.loading = false

      return this.search()
    }
  },
  methods: {
    search() {
      this.loading = true

      if (this.prev)
        this.prev.abort()

      this.prev = spotify.searchAlbums(this.query)
      this.prev.then((data) => {
        this.prev = null
        this.loading = false

        return this.results = data.albums.items
      })
    },
    select(id) {
      spotify.getAlbum(id).then((data) => {
        this.disabled = false
        return this.$store.commit('setAlbum', data)
      })
    }
  },
}
</script>
