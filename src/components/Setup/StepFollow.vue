<template>
  <Step title="The only ones I know..." description="Choose who you want to listen in to.">
    <Search v-model="query" placeholder="Search users" :loading="loading" class="m-b-2">
      <ResultUser
        v-for="result in results"
        :key="result.id_str"
        :item="result"
        :selected="following.some(item => item.id_str === result.id_str)"
        @click="select(result)"/>
    </Search>
    <Button text="Start" @click="confirm"/>
    <template #results>
      <User v-for="user in following" :key="user.id_str" :item="user" list @remove="select(user)"/>
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
import ResultUser from '@/components/common/v2/Search/ResultUser'
import User from '@/components/User'

export default {
  components: {
    Step,
    Button,
    Search,
    ResultUser,
    User
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
  sockets: {
    users: function(data) {
      this.loading = false
      this.results = data
    }
  },
  computed: {
    ...mapGetters([
      'following'
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

      if (this.timeout)
        clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.$socket.emit('search', this.query)
      }, 300)
    },
    select(user) {
      if (this.following[0].id_str === user.id_str)
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
