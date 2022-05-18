<template>
  <div>
    <label v-if="label" class="block text-gray-700 dark:text-slate-300 text-sm font-bold mb-2" :for="id">
      {{ label }}
    </label>
    <div class="relative">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
             focus:ring transition duration-300 input-transition
             dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
        :class="{'text-gray-300 dark:text-slate-500 bg-gray-50': disable}"
        :id="id" :type="type" :placeholder="placeholder" :value="value" @input="onInput" :disabled="disable"
        :autocomplete="autocomplete"/>
      <button @mousedown="clean"
              class="absolute right-2 text-slate-500 opacity-0 pointer-events-none translate-x-4 transition clean-btn">
        <ion-icon class="text-xl" name="close-circle"></ion-icon>
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
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    clean() {
      this.$emit('input', '');
    }
  },
}
</script>

<style scoped>
.clean-btn {
  top: calc(50% - 0.625rem);
}

.input-transition:focus + .clean-btn {
  @apply translate-x-0 opacity-50 pointer-events-auto;
}

.input-transition:focus + .clean-btn:hover {
  @apply opacity-75;
}
</style>
