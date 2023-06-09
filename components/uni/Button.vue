<script>
import {defineComponent} from 'vue'
import {Icon} from "@iconify/vue2";

export default defineComponent({
  name: "Button",
  components: {Icon},
  props: {
    ghost: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
})
</script>

<template>
  <button v-if="ghost" type="button"
          class="text-sm font-bold text-blue-500 hover:text-blue-400
                 dark:text-blue-400/80 dark:hover:text-blue-400 transition"
          :class="{
            'text-blue-500/40 dark:text-blue-400/40 hover:text-blue-500/40 dark:hover:text-blue-400/40': disabled
          }"
          :disabled="disabled"
          @click="handleClick">
    <slot/>
  </button>
  <button v-else :type="type"
          class="text-sm font-bold text-gray-600 dark:text-slate-300/80
                 px-3 py-1.5 shadow-sm rounded-md bg-gray-50 border border-gray-300 dark:border-slate-700 dark:bg-slate-800
                 hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200 dark:active:bg-slate-800
                 focus:outline-none focus:ring-4 focus:ring-gray-200
                 dark:focus:ring-slate-800 focus:ring-opacity-50 dark:focus:ring-opacity-50 transition"
          :class="{
            '!text-red-500 dark:!text-red-400/80': !disabled && danger,
            '!text-red-500/40 dark:!text-red-400/20': disabled && danger,
            '!text-gray-500/60 dark:!text-slate-500/40 bg-gray-200 hover:bg-gray-200 dark:!bg-slate-900 dark:hover:!bg-slate-900': disabled,
            '!px-2 !py-0.5': mini,
            'inline-flex flex-row justify-center items-center gap-1': icon
          }"
          :disabled="disabled"
          @click="handleClick">
    <Icon :icon="icon" v-if="icon" class="inline text-base"/>
    <slot/>
  </button>
</template>

<style scoped>

</style>
