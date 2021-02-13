<template>
  <v-popover trigger="click" placement="bottom-start">
    <slot/>
    <template slot="popover">
      <div class="popover-menu w-15 m-t-1 br-1 b-a overflow-hidden">
        <div class="banner h-9 bg-accent b-b" :style="{backgroundImage: `url(${item.profile_banner_url}`}"/>
        <div class="content p-x-3 p-b-3">
          <Avatar :image="item.profile_image_url" large class="m-b-1"/>
          <div class="d-flex align-items-center f-4 fw-700 lh-condensed wb-break-word">
            {{ item.name }}
            <Verified v-if="item.verified" class="h-3 vertical-align-middle"/>
          </div>
          <div class="handle m-b-2 c-secondary f-5 lh-condensed wb-break-word">{{ item.screen_name }}</div>
          <div v-if="item.description" class="f-4 lh-condensed" v-html="description"/>
          <div class="d-flex m-t-2">
            <Count :count="item.friends_count" label="Following" class="m-r-2"/>
            <Count :count="item.followers_count" label="Followers"/>
          </div>
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
// Libraries
import twttr from 'twitter-text'
// Components
import Avatar from '@/components/Avatar'
import Count from './Count'
// Assets
import Verified from '@/components/icons/Verified'

export default {
  components: {
    Avatar,
    Count,
    Verified
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    description() {
      return this.linkify(this.item.description)
    }
  },
  methods: {
    linkify(text) {
      return twttr.autoLink(text, { usernameIncludeSymbol: true, targetBlank: true })
    }
  }
}
</script>

<style lang='scss' scoped>
  .avatar {
    border: 2px solid var(--bg-color);
  }
  .content {
    margin-top: -32px;
  }
  .banner {
    background-size: cover;
    background-position: center;
  }
</style>
