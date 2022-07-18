<template>
  <div>
    <label v-if="label" class="block text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-2"
           :for="id">
      {{ label }}
    </label>
    <div class="relative">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none
             focus:ring transition duration-300 input-transition
             dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
        :class="{
          'disabled:text-gray-300 disabled:dark:text-slate-500 disabled:bg-gray-50': disable && !copyable,
          'py-4 px-3 text-xl': large
        }"
        :id="id" :type="type" :placeholder="placeholder" :value="value" :disabled="disable" :autocomplete="autocomplete"
        @change="$emit('change', type==='file' ? $event : $event.target.value)"
        @input="$emit('input', $event.target.value)"/>
      <button v-show="!copyable && type !== 'file'" @mousedown="clean" tabindex="-1"
              class="absolute right-2 text-slate-500 opacity-0 pointer-events-none translate-x-4 transition clear-btn">
        <ion-icon class="text-xl" name="close-circle"></ion-icon>
      </button>
      <button v-show="copyable && value !== '' && type !== 'file'"
              @click="copy" :id="`copy_${id}`" :class="{'text-emerald-500': copiedText === 'copied!'}"
              class="absolute transition flex flex-row items-center space-x-1 copy-btn">
        <ion-icon class="text-sm" :name="copiedText === 'copied!' ? 'checkmark-outline' : 'copy-outline'"></ion-icon>
        <span class="text-xs" :class="{'text-emerald-500': copiedText === 'copied!'}">{{ copiedText }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrimaryInput",
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
    }
  },
  data() {
    return {
      copiedText: 'copy',
    }
  },
  methods: {
    clean() {
      this.$emit('input', '');
    },
    copy() {
      navigator.clipboard.writeText(this.value);
      this.copiedText = 'copied!';
      setTimeout(() => {
        this.copiedText = 'copy';
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
