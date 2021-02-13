<template>
  <v-popover
    placement="right-end"
    trigger="click"
    class="mode-picker p-3 pos-fixed">
    <Button icon class="primary">
      <BulbIcon class="h-4"/>
    </Button>
    <template slot="popover">
      <div class="popover-menu w-13 p-2 m-l-1 br-1 b-a">
        <div
          v-for="mode in modes"
          :key="mode"
          v-close-popover
          :class="[`is-${mode} m-t-1 cursor-pointer`, {'is-active': mode === active}]"
          @click="choose(mode)">
          <div class="p-2 d-flex align-items-center bg-color c-text f-5 br-1 b-a">
            <div class="h-3 w-3 m-r-2 bg-accent b-a round"/>
            {{ mode }}
          </div>
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
// Components
import Button from '@/components/common/Button'
// Assets
import BulbIcon from '@/components/icons/Bulb'

export default {
  components: {
    Button,
    BulbIcon
  },
  data() {
    return {
      active: 'normal',
      modes: ['normal', 'dim', 'dark']
    }
  },
  methods: {
    choose(mode) {
      this.active = mode
      document.body.className = `is-${this.active}`
    }
  }
}
</script>

<style lang='scss' scoped>
  .mode-picker {
    bottom: 0;
    left: 0;
  }
  .is-active {
    --border-color: var(--primary-color);
  }
  .button {
    box-shadow: var(--elevation-1), var(--elevation-2);
  }
</style>
