<template>
  <div>
    <label v-if="label" class="block text-gray-700 text-sm font-bold mb-2" :for="id">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :id="id" :type="type" :placeholder="placeholder" :value="value" @input="onInput" :disabled="disable"
      :autocomplete="autocomplete"/>
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
    }
  },
}
</script>

<style scoped>

</style>