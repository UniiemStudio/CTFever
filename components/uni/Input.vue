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
    hotkey: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      inputFieldId: `input-${Math.random().toString(16).slice(2, 9)}`,
      inputText: '',
      isValid: true,
      copyTip: false,
      focused: false,
    }
  },
  computed: {
    extraPaddingClasses() {
      return this.inputClass.split(' ').filter(c => c.startsWith('p')).join(' ')
    },
    hotkeyLabel() {
      if (this.hotkey) {
        let label = this.hotkey.toUpperCase()
        label = label.replace('+', ' ')
        label = label.replace(
          'CTRL',
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M2 6.75A2.75 2.75 0 0 1 4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H4.75A2.75 2.75 0 0 1 2 13.25v-6.5ZM6 7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h.5a.5.5 0 0 0 0-1H6Zm3 .5a.5.5 0 0 0-1 0V9h-.5a.5.5 0 0 0 0 1H8v1.75c0 .69.56 1.25 1.25 1.25h.25a.5.5 0 0 0 0-1h-.25a.25.25 0 0 1-.25-.25V10h.5a.5.5 0 0 0 0-1H9V7.5Zm7 0a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5Zm-4 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 0 0-1h-1a1.5 1.5 0 0 0-1.5 1.5v2a.5.5 0 0 0 1 0v-2Z"/></svg>'
        )
        return label
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.inputText = this.value
    if (this.hotkey) {
      Mousetrap.bind(this.hotkey, () => {
        this.$refs.input.focus()
        return false;
      });
    }
  },
  methods: {
    validate(str) {
      if (this.pattern) {
        this.pattern.lastIndex = 0;
        return this.pattern.test(str)
      } else {
        return true
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
    <!--    <label :for="inputFieldId"-->
    <!--           class="absolute inset-0 text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito']">-->
    <!--      <span>{{ label + '233' }}</span>-->
    <!--    </label>-->
    <div class="relative">
      <input class="p-2 pr-8 rounded-md border border-gray-300 focus:border-gray-400 dark:border-slate-800 dark:focus:border-slate-700 dark:bg-slate-800
                dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gray-200 w-full h-full input-field
                dark:focus:ring-slate-800 focus:ring-opacity-50 dark:focus:ring-opacity-50 transition"
             :class="{
               'text-gray-500/60 dark:text-slate-500/60 bg-gray-200/40 dark:!bg-slate-800/40': disabled,
               '!border-red-500': !isValid,
               [inputClass]: inputClass
             }"
             :id="inputFieldId" @focus="focused = true" @blur="focused = false"
             v-model="inputText" :type="type"
             :disabled="disabled" ref="input"
             :placeholder="placeholder"/>
      <div class="absolute inset-y-0 left-0 pointer-events-none opacity-80 transition-all
                  flex flex-row items-center justify-center select-none" v-if="hotkey"
           :class="{
              '!opacity-0': focused || inputText,
              'p-2': !extraPaddingClasses,
              [extraPaddingClasses]: extraPaddingClasses
            }">
        <span class="opacity-0">{{ placeholder }}</span>
        <kbd class="inline-flex flex-row items-center justify-center mt-0.5 ml-1 px-0.5 py-0 text-xs rounded border
                    bg-gray-200 border-gray-300 dark:bg-slate-600 dark:border-slate-500 dark:text-slate-300"
             v-html="hotkeyLabel"></kbd>
      </div>
    </div>
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
