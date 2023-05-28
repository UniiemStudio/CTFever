<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SettingsFormInput",
  props: {
    value: {
      type: String | Number,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: RegExp,
      default: null
    }
  },
  data() {
    return {
      isValid: true
    }
  },
  mounted() {
    this.isValid = this.validator(this.value)
  },
  methods: {
    validator(str) {
      return this.pattern ? this.pattern.test(str) : true
    },
    handleInput(e) {
      this.eventValue = e.target.value
      this.isValid = this.validator(this.eventValue)
      if (this.isValid) {
        this.$emit('input', this.eventValue)
      }
    },
  },
})
</script>

<template>
  <input class="p-2 rounded-md border border-gray-200 focus:border-gray-400 dark:border-slate-800 dark:focus:border-slate-700 dark:bg-slate-800
                dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gray-200
                dark:focus:ring-slate-800 focus:ring-opacity-50 dark:focus:ring-opacity-50 transition"
         :class="{
           'text-gray-500/60 dark:text-slate-500/60 bg-gray-200/40 dark:!bg-slate-800/40': disabled,
           '!border-red-500': !isValid
           // '!border-red-500': false
         }"
         @input="handleInput"
         :value="value" :type="type"
         :disabled="disabled" ref="input"
         :placeholder="placeholder"/>
</template>

<style scoped>

</style>
