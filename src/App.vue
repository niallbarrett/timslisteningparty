<template>
  <div id="app" class="d-flex justify-content-center align-items-start">
    <div v-if="album.id" class="w-14 pos-sticky top-0">
      <Spotify :item="album"/>
    </div>
    <Timeline class="m-x-3"/>
    <div v-if="!!following.length" class="w-14 pos-sticky top-0">
      <Panel title="Following">
        <User v-for="user in following" :key="user.id_str" :item="user"/>
      </Panel>
    </div>
    <Setup v-if="showSetup" :show.sync="showSetup"/>
    <ModePicker/>
    <TweetModal v-if="highlight" :item="highlight"/>
  </div>
</template>

<script>
// Libraries
import { mapGetters } from 'vuex'
// Components
import Setup from '@/components/Setup'
import Timeline from '@/components/Timeline'
import User from '@/components/Twitter/User'
import TweetModal from '@/components/Twitter/TweetModal'
import Panel from '@/components/common/Panel'
import Spotify from '@/components/Spotify'
import ModePicker from '@/components/ModePicker'

export default {
  components: {
    Setup,
    Timeline,
    User,
    TweetModal,
    Panel,
    Spotify,
    ModePicker
  },
  data() {
    return {
      showSetup: true
    }
  },
  computed: {
    ...mapGetters([
      'following',
      'album',
      'highlight'
    ])
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
