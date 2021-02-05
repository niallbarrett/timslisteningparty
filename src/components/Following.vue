<template>
  <div class="w-4xlg">
    <Panel v-if="following.length > 0" title="Following" class="bg-accent">
      <User v-for="user in following" :key="user.id_str" :item="user"/>
    </Panel>
  </div>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
// Components
import Panel from '@/components/common/Panel'
import User from '@/components/User'

export default {
  components: {
    Panel,
    User
  },
  computed: {
    ...mapGetters([
      'following'
    ])
  }
}
</script>
