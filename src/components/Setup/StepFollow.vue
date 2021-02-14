<template>
  <Step
    title="The only ones I know..."
    description="Choose who you want to listen along with."
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
        class="cursor-pointer"
        @click="select(result)"/>
    </Search>
    <template #results>
      <User
        v-for="user in following"
        :key="user.id_str"
        :item="user"
        :dismiss="user.id_str !== timId"
        @remove="select(user)"/>
    </template>
    <template #footer>
      <Button v-if="token" text="Re-choose album" clear @click="$emit('prev')"/>
      <Button text="Start the party" class="primary m-l-2" @click="confirm"/>
    </template>
  </Step>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
// Components
import Step from './Step'
import Button from '@/components/common/Button'
import Search from '@/components/common/Search'
import User from '@/components/Twitter/User'

export default {
  components: {
    Step,
    Button,
    Search,
    User
  },
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      disabled: true
    }
  },
  sockets: {
    users: function(data) {
      this.results = data.errors ? [] : data
      this.loading = false
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'following',
      'timId'
    ])
  },
  created() {
    this.search = debounce(this.search, 300)
  },
  watch: {
    query() {
      this.search()
    }
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
      this.$socket.emit('start', this.following.map(user => user.id_str))
      this.$emit('next')
    }
  }
}
</script>
