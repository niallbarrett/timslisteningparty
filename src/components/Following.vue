<template>
  <div class="w-4xlg">
    <Search
      v-model="query"
      placeholder="Search Users"
      :loading="loading"
      :count="results.length">
      <ResultUser v-for="result in results" :key="result.id_str" :item="result" @click="follow(result)"/>
    </Search>
    <Panel v-if="following.length > 0" title="Following" class="bg-accent">
      <User v-for="user in following" :key="user.id_str" :item="user"/>
    </Panel>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Panel from '@/components/common/Panel'
import ResultUser from '@/components/Search/ResultUser'
import User from '@/components/User'

export default {
  components: {
    Search,
    Panel,
    ResultUser,
    User
  },
  data() {
    return {
      query: '',
      loading: false,
      results: [],
      following: []
    }
  },
  sockets: {
    users: function(data) {
      this.loading = false
      this.results = data
    }
  },
  methods: {
    search() {
      this.loading = true
      if (this.timeout)
        clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
       this.$socket.emit('search', this.query)
      }, 300);
    },
    follow(user) {
      this.query = ''
      this.following.push(user)
      this.$socket.emit('follow', user.id_str)
    }
  },
  watch: {
    query(val) {
      if (val.length === 0)
        return this.loading = false

      return this.search()
    }
  }
}
</script>
