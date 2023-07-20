<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Textarea",
  props: {
    value: {
      type: String | Number,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rows: {
      type: String | Number,
      default: 3
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
    },
    inputClass: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      inputFieldId: `textarea-${Math.random().toString(16).slice(2, 9)}`,
      inputText: '',
      isValid: true,
      focused: false,
    }
  },
  computed: {
    extraPaddingClasses() {
      return this.inputClass.split(' ').filter(c => c.startsWith('p')).join(' ')
    },
  },
  mounted() {
    this.inputText = this.value
  },
  methods: {
    onFocus() {
      this.focused = true
      this.$emit('focus')
    },
    onBlur() {
      this.focused = false
      this.$emit('blur')
    },
    validate(str) {
      if (this.pattern) {
        this.pattern.lastIndex = 0;
        return this.pattern.test(str)
      } else {
        return true
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  },
  watch: {
    inputText(val) {
      this.isValid = this.validate(val)
      if (this.isValid) {
        this.$emit('input', val)
      }
    },
    value(val) {
      if (this.validate(val)) {
        this.inputText = val
      }
    }
  }
})
</script>

<template>
  <div class="relative">
    <label v-if="label" :for="inputFieldId"
           class="block w-fit text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-1">
      <span>{{ label }}</span>
    </label>
    <div class="relative">
      <textarea class="p-2 pr-8 rounded-md border border-gray-300 focus:border-gray-400 dark:border-slate-800 dark:focus:border-slate-700 dark:bg-slate-800
                dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gray-200 w-full h-full input-field
                dark:focus:ring-slate-800 focus:ring-opacity-50 dark:focus:ring-opacity-50 transition"
                :class="{
               'text-gray-500/60 dark:text-slate-500/60 bg-gray-200/40 dark:!bg-slate-800/40': disabled,
               '!border-red-500': !isValid,
               [inputClass]: inputClass
             }"
                :id="inputFieldId" @focus="onFocus" @blur="onBlur"
                v-model="inputText" :rows="rows"
                :disabled="disabled" ref="input"
                :placeholder="placeholder"/>
    </div>
  </div>
</template>

<style scoped>

</style>
