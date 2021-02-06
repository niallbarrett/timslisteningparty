<template>
  <div class="user p-2 d-flex align-items-center b-t cursor-pointer" :class="{'is-selected': selected}" v-on="$listeners">
    <Avatar :image="item.profile_image_url_https" class="h-6 w-6 m-r-2"/>
    <div class="d-flex direction-column">
      <div class="d-flex align-items-center">
        <div class="f-4 fw-700">{{ item.name }}</div>
        <Verified v-if="item.verified" class="h-3 m-l-1"/>
      </div>
      <div class="handle c-secondary f-5">{{ item.screen_name }}</div>
    </div>
  </div>
</template>

<script>
// Components
import Avatar from '@/components/Avatar'
// Assets
import Verified from '@/components/icons/Verified'

export default {
  components: {
    Avatar,
    Verified
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .user:first-of-type {
    border-top-width: 0;
  }
  .is-selected {
    background-color: red;
  }
</style>
