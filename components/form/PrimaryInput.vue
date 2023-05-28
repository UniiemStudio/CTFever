<template>
  <div>
    <label v-if="label" class="block text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-2"
           :for="id">
      {{ label }}
    </label>
    <div class="relative">
      <input :autofocus="autofocus"
             class="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none
             focus:ring transition duration-300 input-transition
             dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
             :class="{
               'disabled:text-gray-300 disabled:dark:text-slate-500 disabled:bg-gray-50': disable && !copyable,
               'py-4 px-3 text-xl': large
             }"
             :id="id" :type="type" :placeholder="placeholder" :value="value" :disabled="disable"
             :autocomplete="autocomplete" ref="input"
             @change="$emit('change', $event.target.value)"
             @input="inputHandler($event)"/>
      <button v-show="!copyable" @mousedown="clean" tabindex="-1" type="button"
              class="absolute right-2 text-slate-500 opacity-0 pointer-events-none translate-x-4 transition clear-btn">
        <Icon icon="tabler:circle-x-filled" class="text-xl"/>
      </button>
      <button v-show="copyable && value !== ''"
              @click="copy" :id="`copy_${id}`" :class="{'text-emerald-500': copiedText === 'common.copied'}"
              class="absolute transition flex flex-row items-center space-x-1 copy-btn">
        <Icon :icon="copiedText === 'common.copied' ? 'tabler:check' : 'tabler:copy'" class="text-base"/>
        <span class="text-xs" :class="{'text-emerald-500': copiedText === 'common.copied'}">{{ $t(copiedText) }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";

export default {
  name: "PrimaryInput",
  components: {Icon},
  props: {
    id: {
      type: String,
      default: "primary-input",
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    disable: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ""
    },
    copyable: {
      type: Boolean,
      default: false
    },
    large: {
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
      copiedText: 'common.copy',
    }
  },
  methods: {
    inputHandler(e) {
      let eventValue = e.target.value;
      if (this.pattern) {
        eventValue = eventValue.replaceAll(this.pattern, '');
        this.$refs.input.value = eventValue;
      }
      this.$emit('input', eventValue);
    },
    clean() {
      this.$emit('input', '');
    },
    copy() {
      navigator.clipboard.writeText(this.value);
      this.copiedText = 'common.copied';
      setTimeout(() => {
        this.copiedText = 'common.copy';
      }, 1500);
    },
  },
}
</script>

<style scoped>
.clear-btn {
  top: calc(50% - 0.625rem);
}

.input-transition:focus + .clear-btn {
  @apply translate-x-0 opacity-50 pointer-events-auto;
}

.input-transition:focus + .clear-btn:hover {
  @apply opacity-75;
}

.copy-btn {
  top: 0.3rem;
  @apply bg-white/30 dark:bg-slate-300/30 backdrop-blur-lg dark:text-slate-300 px-1.5 py-1 border border-gray-300 dark:border-slate-500 rounded shadow-sm;
  @apply right-1.5 text-slate-500 translate-x-0 transition opacity-100 pointer-events-auto font-['Nunito'] font-extrabold;
}

.copy-btn:hover {
  @apply opacity-100 shadow active:shadow-inner;
}
</style>
