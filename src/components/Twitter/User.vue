<template>
  <div
    :class="['user min-w-0 d-flex align-items-center flex-1 cursor-default', {'p-2 hover': !readonly}, {'is-active': active}]"
    v-on="$listeners">
    <UserPopover :item="item" :disabled="result">
      <Avatar :image="item.profile_image_url_https" class="m-r-2"/>
    </UserPopover>
    <UserPopover :item="item" class="min-w-0 w-fit" :disabled="result">
      <div :class="['min-w-0 d-flex direction-column', {'user-hover': !result}]">
        <div class="d-flex align-items-center f-4 fw-700 lh-condensed">
          <span class="name t-ellipsis">{{ item.name }}</span>
          <Verified v-if="item.verified" class="h-3"/>
        </div>
        <span class="handle c-secondary f-5 t-ellipsis">{{ item.screen_name }}</span>
      </div>
    </UserPopover>
    <div v-if="dismiss" class="p-x-2 m-l-auto">
      <Button icon compact class="flex-shrink-0" @click="$emit('remove')">
        <CloseIcon class="h-3"/>
      </Button>
    </div>
  </div>
</template>

<script>
// Components
import UserPopover from './UserPopover'
import Avatar from './Avatar'
import Button from '@/components/common/Button'
// Assets
import Verified from '@/components/icons/Verified'
import CloseIcon from '@/components/icons/Close'

export default {
  components: {
    UserPopover,
    Avatar,
    Button,
    Verified,
    CloseIcon
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
    },
    result: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .user.is-active {
    background-color: #{'rgb(var(--border-color))'};
  }
  .user-hover:hover .name {
    text-decoration: underline;
  }
</style>
