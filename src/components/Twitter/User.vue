<template>
  <div
    :class="['d-flex align-items-center flex-1 cursor-default', {'bg-border': active}, {'p-2 hover': !readonly}]"
    v-on="$listeners">
    <Avatar :image="item.profile_image_url_https" class="m-r-2"/>
    <div :class="['d-flex direction-column', {'p-r-2': dismiss}]">
      <div class="d-flex align-items-center f-4 fw-700 lh-condensed wb-break-word">
        {{ item.name }}
        <Verified v-if="item.verified" class="h-3"/>
      </div>
      <div class="handle c-secondary f-5 wb-break-word">{{ item.screen_name }}</div>
    </div>
    <Button v-if="dismiss" icon compact class="m-l-auto m-r-2 flex-shrink-0" @click="$emit('remove')">
      <CloseIcon class="h-3"/>
    </Button>
  </div>
</template>

<script>
// Components
import Avatar from './Avatar'
import Button from '@/components/common/Button'
// Assets
import Verified from '@/components/icons/Verified'
import CloseIcon from '@/components/icons/Close'

export default {
  components: {
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
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
