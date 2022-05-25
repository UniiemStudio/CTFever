<template>
  <div>
    <label v-if="label" class="block text-gray-700 dark:text-slate-300 text-sm font-bold mb-2" :for="id">
      {{ label }}
    </label>
    <div class="relative">
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
             focus:ring transition duration-300 input-transition
             dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
        :class="{'text-gray-300 dark:text-slate-500 bg-gray-50': disable}"
        :rows="rows" :id="id" :placeholder="placeholder" :value="value" @input="onInput" :disabled="disable"
        :autocomplete="autocomplete"/>
      <button @click="copy" :id="`copy_${id}`"
              class="absolute transition copy-btn">
        <ion-icon class="text-base translate-y-0.5" name="copy-outline"></ion-icon>
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
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    copy() {
      console.log(`Copied to clipboard: ${this.value}`);
      navigator.clipboard.writeText(this.value);
    },
  },
}
</script>

<style scoped>
.copy-btn {
  @apply bg-white dark:bg-slate-800 dark:text-slate-300 px-2 py-1 border border-gray-200 rounded shadow-lg;
  @apply top-2 right-2 text-slate-500 translate-x-0 opacity-50 pointer-events-auto;
}

.copy-btn:hover {
  @apply opacity-100;
}
</style>
