<script>
import {defineComponent} from 'vue'
import {Icon} from "@iconify/vue2";
import {copyTextToClipboard} from "~/libs/common";

export default defineComponent({
  name: "Input",
  components: {Icon},
  props: {
    value: {
      type: String | Number,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
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
    copyable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      inputFieldId: `input-${Math.random().toString(16).slice(2, 9)}`,
      isValid: true,
      copyTip: false,
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
      // this.$refs.input.value = this.eventValue
      this.isValid = this.validator(this.eventValue)
      if (this.isValid) {
        this.$emit('input', this.eventValue)
      }
    },
    copyHandler() {
      copyTextToClipboard(this.value, ret => {
        this.copyTip = true
        setTimeout(() => {
          this.copyTip = false
        }, 1000)
      })
    },
    clearHandler() {
      this.$emit('input', '')
    }
  },
})
</script>

<template>
  <div class="relative">
    <label v-if="label" :for="inputFieldId"
           class="block w-fit text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-1">{{
        label
      }}</label>
    <input class="p-2 pr-8 rounded-md border border-gray-300 focus:border-gray-400 dark:border-slate-800 dark:focus:border-slate-700 dark:bg-slate-800
                dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gray-200 w-full h-full input-field
                dark:focus:ring-slate-800 focus:ring-opacity-50 dark:focus:ring-opacity-50 transition"
           :class="{
             'text-gray-500/60 dark:text-slate-500/60 bg-gray-200/40 dark:!bg-slate-800/40': disabled,
             '!border-red-500': !isValid,
           }"
           @input="handleInput"
           @change="$emit('change', $event.target.value)"
           :id="inputFieldId"
           :value="value" :type="type"
           :disabled="disabled" ref="input"
           :placeholder="placeholder"/>
    <div class="absolute inset-y-0 right-2 my-auto w-fit flex flex-row items-center space-x-1 overflow-hidden"
         :class="{
      'top-6': label
    }">
      <button class="text-slate-500 w-6 h-6 flex justify-center items-center btn-copy border-transparent"
              :class="{'text-emerald-500': copyTip}"
              tabindex="-1" type="button" @mousedown="copyHandler"
              v-show="copyable && value">
        <Icon :icon="copyTip ? 'tabler:check' : 'tabler:copy'" class="text-lg opacity-50"/>
      </button>
      <button class="text-slate-500 opacity-50 btn-clear !-mr-6" tabindex="-1" type="button"
              @mousedown="clearHandler">
        <Icon icon="tabler:clear-all" class="text-xl"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-field + div > button {
  @apply transition-all;
}

.input-field:focus + div > button.btn-copy {
  @apply shadow-sm bg-white rounded-md border border-slate-300;
}

.input-field:focus + div > button.btn-clear {
  @apply !-mr-0;
}
</style>
