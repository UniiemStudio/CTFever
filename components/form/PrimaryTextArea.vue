<template>
  <div>
    <label v-if="label" class="block text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-2"
           :for="id">
      {{ label }}
    </label>
    <div class="relative">
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
             focus:ring transition duration-300 input-transition
             dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
        :class="{'text-gray-300 dark:text-slate-500 bg-gray-50': disable}"
        :rows="rows" :id="id" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)"
        :disabled="disable"
        :autocomplete="autocomplete"/>
      <button v-show="copyable && value !== ''"
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
  name: "PrimaryArea",
  props: {
    id: {
      type: String,
      default: "primary-area",
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
    rows: {
      type: Number,
      default: 5
    },
    disable: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    value: {
      type: String,
      default: ""
    },
    copyable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      copiedText: 'copy'
    }
  },
  methods: {
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
.copy-btn {
  @apply bg-white/30 dark:bg-slate-300/30 backdrop-blur-lg dark:text-slate-300 px-1.5 py-1 border border-gray-300 dark:border-slate-500 rounded shadow-sm;
  @apply top-2 right-2 text-slate-500 translate-x-0 transition opacity-100 pointer-events-auto font-['Nunito'] font-extrabold;
}

.copy-btn:hover {
  @apply opacity-100 shadow active:shadow-inner;
}
</style>
