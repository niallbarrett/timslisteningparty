<template>
  <v-popover
    :placement="placement"
    trigger="click"
    :delay="{ show: 600, hide: 0 }"
    boundaries-element="body"
    container="body"
    class="cursor-default">
    <slot/>
    <template slot="popover">
      <div class="popover-menu w-100 m-t-1 br-1 b-a overflow-hidden">
        <div class="banner h-9 bg-accent b-b" :style="{backgroundImage: `url(${item.profile_banner_url}`}"/>
        <div class="content p-x-3 p-b-3">
          <Avatar :image="item.profile_image_url" large class="m-b-1"/>
          <div class="d-flex align-items-center f-4 fw-700 lh-condensed wb-break-word">
            {{ item.name }}
            <Verified v-if="item.verified" class="h-3 m-l-1 vertical-align-middle"/>
          </div>
          <div class="handle m-b-2 c-secondary f-5 lh-condensed wb-break-word">{{ item.screen_name }}</div>
          <div v-if="item.description" class="f-4 lh-condensed" v-html="description"/>
          <div class="d-flex m-t-2">
            <Count :count="following" label="Following" class="m-r-2"/>
            <Count :count="followers" label="Followers"/>
          </div>
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
// Libraries
import { autoLink, formatCount } from '@/utils/Twitter'
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
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  computed: {
    description() {
      return autoLink(this.item.description)
    },
    following() {
      return formatCount(this.item.friends_count)
    },
    followers() {
      return formatCount(this.item.followers_count)
    }
  }
}
</script>

<style lang='scss' scoped>
  .popover-menu {
    max-width: 300px;
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
  }
</style>
