<template>
  <div class="user p-t-2xs p-r-xs p-b-2xs p-l-xs d-flex align-items-center b-t">
    <img :src="item.profile_image_url_https" class="h-lg w-lg m-r-xs br-lg">
    <div class="d-flex direction-column">
      <div class="d-flex align-items-center">
        <div class="fw-700">{{ item.name }}</div>
        <Verified v-if="item.verified" class="h-sm"/>
      </div>
      <div class="handle c-secondary">{{ item.screen_name }}</div>
    </div>
  </div>
</template>

<script>
import Verified from '@/components/Verified'

export default {
  components: {
    Verified
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
  .user:first-of-type {
    border-top-width: 0;
  }
</style>
