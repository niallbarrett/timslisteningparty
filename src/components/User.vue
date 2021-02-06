<template>
  <div class="p-y-2 d-flex align-items-center cursor-default">
    <Avatar :image="item.profile_image_url_https" class="m-r-2"/>
    <div class="d-flex direction-column">
      <div class="d-flex align-items-center lh-condensed">
        <div class="f-4 fw-700">
          {{ item.name }}
        </div>
        <Verified v-if="item.verified" class="h-3 m-l-1"/>
      </div>
      <div class="handle c-secondary f-5">
        {{ item.screen_name }}
      </div>
    </div>
    <Button v-if="list" icon compact class="m-l-auto flex-shrink-0" @click="$emit('remove')">
      j
    </Button>
  </div>
</template>

<script>
// Components
import Avatar from '@/components/Avatar'
import Button from '@/components/common/v2/Button'
// Assets
import Verified from '@/components/icons/Verified'

export default {
  components: {
    Avatar,
    Button,
    Verified
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    list: {
      type: Boolean,
      default: false
    }
  }
}
</script>
