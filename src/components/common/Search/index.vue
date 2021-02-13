<template>
  <v-popover trigger="click">
    <Field v-model="query" v-bind="$attrs" inputClass="p-l-6">
      <SearchIcon class="h-3 m-l-3 pos-absolute c-primary"/>
    </Field>
    <template slot="popover">
      <div class="popover-menu max-h-14 m-t-1 pos-relative br-1 b-a overflow-y-auto" :class="{'h-8 overflow-y-hidden': loading}" :style="{width: `${width}px`}">
        <slot v-if="!!count && !!query.length"/>
        <div v-else class="min-h-8 p-x-3 d-flex align-items-center justify-content-center c-secondary f-5 ta-c">
          {{ message }}
        </div>
        <Spinner v-if="loading"/>
      </div>
    </template>
  </v-popover>
</template>

<script>
// Components
import Field from '@/components/common/Input'
import Spinner from '@/components/common/Spinner'
// Assets
import SearchIcon from '@/components/icons/Search'

export default {
  components: {
    Field,
    Spinner,
    SearchIcon
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    empty: {
      type: String,
      default: 'Search for something or other'
    },
    count: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    this.width = this.$el.clientWidth
  },
  computed: {
    query: {
      get() {
        return this.value
      },
      set(val) {
        return this.$emit('input', val)
      }
    },
    message() {
      if (!this.query.length)
        return this.empty

      return 'No results found.'
    }
  }
}
</script>
