<template>
  <div id="app" class="d-flex justify-content-center align-items-start" @keyup.up="setup" tabIndex="0">
    <div v-if="album.id" class="w-14 pos-sticky-t">
      <Spotify :item="album"/>
    </div>
    <Timeline class="m-x-3"/>
    <div v-if="!!following.length" class="w-14 pos-sticky-t">
      <Panel title="Following">
        <UserPopover v-for="user in following" :key="user.id_str" :item="user">
          <User :item="user"/>
        </UserPopover>
      </Panel>
    </div>
    <ModePicker/>
    <TweetModal v-if="highlight" :item="highlight"/>
    <Setup v-if="showSetup" :show.sync="showSetup"/>
  </div>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
// Components
import Setup from '@/components/Setup'
import Timeline from '@/components/Timeline'
import User from '@/components/Twitter/User'
import UserPopover from '@/components/Twitter/UserPopover'
import TweetModal from '@/components/Twitter/TweetModal'
import Panel from '@/components/common/Panel'
import Spotify from '@/components/Spotify'
import ModePicker from '@/components/ModePicker'

export default {
  components: {
    Setup,
    Timeline,
    User,
    UserPopover,
    TweetModal,
    Panel,
    Spotify,
    ModePicker
  },
  data() {
    return {
      debug: false,
      showSetup: !this.debug
    }
  },
  computed: {
    ...mapGetters([
      'following',
      'album',
      'highlight'
    ])
  },
  methods: {
    setup() {
      if (this.debug)
        return this.showSetup = !this.showSetup
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
