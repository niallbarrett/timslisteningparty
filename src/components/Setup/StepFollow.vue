<template>
  <Step
    title="The only ones I know..."
    description="Choose who you want to listen along with on Twitter."
    wide>
    <Search
      v-model="query"
      placeholder="Search users"
      empty="Search by username or @handle"
      :count="results.length"
      :loading="loading">
      <User
        v-for="result in results"
        :key="result.id_str"
        :item="result"
        :active="following.some(item => item.id_str === result.id_str)"
        result
        class="cursor-pointer"
        @click="select(result)"/>
    </Search>
    <Spinner v-if="empty || starting" :message="message"/>
    <template #results>
      <User
        v-for="user in following"
        :key="user.id_str"
        :item="user"
        :dismiss="user.id_str !== timId"
        @remove="select(user)"/>
    </template>
    <template #footer>
      <Button v-if="token" clear class="m-r-auto" @click="$emit('prev')">
        <ArrowBackIcon class="h-3 m-r-1"/>
        Re-choose album
      </Button>
      <Button text="Start the party" :disabled="empty" class="primary m-l-2" @click="confirm"/>
    </template>
  </Step>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
// Components
import Step from './Step'
import Spinner from '@/components/common/Spinner/Vinyl'
import Button from '@/components/common/Button'
import Search from '@/components/common/Search'
import User from '@/components/Twitter/User'
// Assets
import ArrowBackIcon from '@/components/icons/ArrowBack'

export default {
  components: {
    Step,
    Spinner,
    Button,
    Search,
    User,
    ArrowBackIcon
  },
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      starting: false
    }
  },
  sockets: {
    user: function(data) {
      return this.$store.commit('addUser', data)
    },
    users: function(data) {
      this.results = data.errors ? [] : data
      this.loading = false
    },
    connected: function() {
      this.starting = false
      this.$emit('next')
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'following',
      'timId'
    ]),
    empty() {
      return !this.following.length
    },
    message() {
      if (this.starting)
        return 'Starting #timslisteningparty'

      return `All that is important is that we're grabbing Tim`
    }
  },
  watch: {
    query() {
      this.search()
    }
  },
  created() {
    this.search = debounce(this.search, 280)

    if (this.empty)
      this.$socket.emit('user', this.timId)
  },
  methods: {
    search() {
      if (!this.query)
        return this.loading = false

      this.loading = true
      this.$socket.emit('search', this.query)
    },
    select(user) {
      if (user.id_str === this.timId)
        return

      if (this.following.some(item => item.id_str === user.id_str))
        return this.$store.commit('removeUser', user)

      return this.$store.commit('addUser', user)
    },
    confirm() {
      this.starting = true
      this.$socket.emit('start', this.following.map(user => user.id_str))
    }
  }
}
</script>
