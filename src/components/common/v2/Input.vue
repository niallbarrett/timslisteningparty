<template>
  <div class="input d-flex flex-1 pos-relative">
    <input :value="value" :placeholder="placeholder" class="input h-6 p-x-3 bg-accent flex-1 f-5" v-on="listeners">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners() {
      const vm = this
      return {
        ...this.$listeners,
        input(event) {
          vm.$emit('input', event.target.value)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .input {
    border-radius: 4px;
  }
</style>
