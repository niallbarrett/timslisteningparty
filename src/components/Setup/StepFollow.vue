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
    <Spinner v-if="empty" message="All that is important is that we're grabbing Tim"/>
    <template #results>
      <UserPopover v-for="user in following" :key="user.id_str" :item="user">
        <User :item="user" :dismiss="user.id_str !== timId" @remove="select(user)"/>
      </UserPopover>
    </template>
    <template #footer>
      <Button v-if="token" text="Re-choose album" clear class="m-r-auto" @click="$emit('prev')"/>
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
import Spinner from '@/components/common/Spinner'
import Button from '@/components/common/Button'
import Search from '@/components/common/Search'
import User from '@/components/Twitter/User'
import UserPopover from '@/components/Twitter/UserPopover'

export default {
  components: {
    Step,
    Spinner,
    Button,
    Search,
    User,
    UserPopover
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
    user: function(data) {
      return this.$store.commit('addUser', data)
    },
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
    ]),
    empty() {
      return !this.following.length
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
      this.$socket.emit('start', this.following.map(user => user.id_str))
      this.$emit('next')
    }
  }
}
</script>
