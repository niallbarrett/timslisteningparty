<template>
  <transition name="slide" appear>
    <div class="h-0 pos-sticky-t d-flex justify-content-center pointer-events-none">
      <div class="scroll-top h-5 p-l-2 p-r-3 m-3 pos-absolute d-flex align-items-center bg-primary f-5 pointer-events-all cursor-pointer" v-on="$listeners">
        <ArrowUpIcon class="h-3"/>
        <div class="m-r-3 d-flex">
          <Avatar
            v-for="user in users.slice(0, 3)"
            :key="user.id_str"
            :image="user.profile_image_url"
            compact/>
        </div>
        {{ label }}
      </div>
    </div>
  </transition>
</template>

<script>
// Components
import Avatar from '@/components/Twitter/Avatar'
// Assets
import ArrowUpIcon from '@/components/icons/ArrowUp'

export default {
  components: {
    Avatar,
    ArrowUpIcon
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    users() {
      return this.items.filter((val, index, arr) => arr.findIndex( item => (item.id_str === val.id_str)) === index)
    },
    label() {
      return `${this.items.length} new tweet${this.items.length > 1 ? 's' : ''}`
    }
  }
}
</script>

<style lang='scss' scoped>
  .scroll-top {
    color: #fff;
    border-radius: 16px;
    box-shadow: var(--elevation-2);
  }
  .avatar {
    margin-right: -8px;
    border: 2px solid var(--primary-color);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0;
  }
  .slide-enter {
    transform: translateY(-10px);
  }
  .slide-leave-active {
    transform: translateY(10px);
  }
</style>
