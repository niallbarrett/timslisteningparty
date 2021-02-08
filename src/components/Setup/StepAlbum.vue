<template>
  <Step title="Choose the album" description="Something." wide>
    <Search v-model="query" placeholder="Search albums" empty="Search by artist or album name" :count="results.length" :loading="loading">
      <ResultAlbum
        v-for="result in results"
        :key="result.id"
        v-close-popover
        :item="result"
        @click="select(result.id)"/>
    </Search>
    <template #results>
      <Album :item="album"/>
    </template>
    <template #footer>
      <Button text="Next" :disabled="disabled" class="primary" @click="$emit('next')"/>
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
import Button from '@/components/common/v2/Button'
import Search from '@/components/common/v2/Search'
import ResultAlbum from '@/components/common/v2/Search/ResultAlbum'

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
