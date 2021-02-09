<template>
  <div :class="['user p-y-2 p-x-2 d-flex align-items-center cursor-default', {'is-active': active}]" v-on="$listeners">
    <Avatar :image="item.profile_image_url_https" class="m-r-2"/>
    <div :class="['d-flex direction-column', {'p-r-2': dismiss}]">
      <div class="d-flex align-items-center f-4 fw-700 lh-condensed wb-break-word">
        {{ item.name }}
        <Verified v-if="item.verified" class="h-3 vertical-align-middle"/>
      </div>
      <div class="handle c-secondary f-5 wb-break-word">{{ item.screen_name }}</div>
    </div>
    <Button v-if="dismiss" icon compact class="m-l-auto m-r-2 flex-shrink-0" @click="$emit('remove')">
      <Close class="h-3"/>
    </Button>
  </div>
</template>

<script>
// Components
import Avatar from '@/components/Avatar'
import Button from '@/components/common/v2/Button'
// Assets
import Verified from '@/components/icons/Verified'
import Close from '@/components/icons/Close'

export default {
  components: {
    Avatar,
    Button,
    Verified,
    Close
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    dismiss: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .user {
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.is-active {
      background-color: var(--border-color);
    }
  }
</style>
