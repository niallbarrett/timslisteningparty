<template>
  <Step
    title="The only ones I know..."
    description="Choose who you want to listen along with."
    wide
    class="is-w-fixed">
    <Search v-model="query" placeholder="Search users" empty="Search by username or @handle" :count="results.length" :loading="loading">
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
      <Button text="Start the party" class="primary" @click="confirm"/>
    </template>
  </Step>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
// Components
import Step from './Step'
import Button from '@/components/common/v2/Button'
import Search from '@/components/common/v2/Search'
import User from '@/components/User'

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
      prev: null,
      disabled: true,
      timeout: null
    }
  },
  sockets: {
    users: function(data) {
      this.loading = false
      this.results = data
    }
  },
  computed: {
    ...mapGetters([
      'following',
      'timId'
    ]),
  },
  watch: {
    query(val) {
      if (val.length > 0)
        return this.search(val)

      return this.loading = false
    }
  },
  methods: {
    search(query) {
      this.loading = true

      if (this.timeout)
        clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.$socket.emit('search', query)
      }, 300)
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
